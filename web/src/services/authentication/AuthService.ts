import envConfig from '@/config/env';
import NoAuthenticatedUserError from '@/errors/authentication/NoAuthenticatedUserError';
import type { CognitoUserSession } from 'amazon-cognito-identity-js';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    ISignUpResult,
} from 'amazon-cognito-identity-js';

const USER_POOL_ID = envConfig.Cognito.USER_POOL_ID;
const CLIENT_ID = envConfig.Cognito.CLIENT_ID;

if (!CLIENT_ID || !USER_POOL_ID) {
    console.warn(
        'Missing Cognito CLIENT_ID or USER_POOL_ID. AuthService will be unavailable!',
    );
}

export default class AuthService {
    static #INSTANCE: AuthService | null = null;
    private readonly userPool: CognitoUserPool;

    public constructor() {
        this.userPool = new CognitoUserPool({
            ClientId: CLIENT_ID ?? '',
            UserPoolId: USER_POOL_ID ?? '',
            // Storage: localStorage, // TODO: Implement a better storage solution
        });
    }

    private async handleLoginSuccess(resolve: (value: boolean) => void) {
        resolve(true);
    }

    private async handleLoginFailure(
        error: unknown,
        reject: (reason?: unknown) => void,
    ) {
        reject(error);
    }

    public async login(
        username: string,
        password: string,
        redirectToMfa: () => void,
    ): Promise<boolean> {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: this.userPool,
        });
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });
        return await new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: () => this.handleLoginSuccess(resolve),
                onFailure: (error: unknown) =>
                    this.handleLoginFailure(error, reject),
                mfaRequired: () => redirectToMfa(),
            });
        });
    }

    public async logout(): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            const cognitoUser = this.userPool.getCurrentUser();
            if (!cognitoUser) {
                reject(
                    new NoAuthenticatedUserError(
                        'NoAuthenticatedUser',
                        'No user is currently logged in.',
                    ),
                );
                return;
            }
            cognitoUser.getSession((error: Error | null) => {
                if (!!error) {
                    reject(error);
                    return;
                }
            });
            cognitoUser.globalSignOut({
                onSuccess: () => resolve(true),
                onFailure: reject,
            });
        });
    }

    public async signUp(
        email: string,
        username: string,
        password: string,
    ): Promise<ISignUpResult | undefined> {
        const emailAttribute = new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        });
        return await new Promise((resolve, reject) => {
            this.userPool.signUp(
                username,
                password,
                [emailAttribute],
                [],
                (error?: Error, result?: ISignUpResult) => {
                    if (!!error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                },
            );
        });
    }

    public async confirmUser(username: string, code: string): Promise<void> {
        return await new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: this.userPool,
            });
            cognitoUser.confirmRegistration(code, true, (error?: unknown) => {
                if (!!error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }

    public async isAuthenticated(): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            const cognitoUser = this.userPool.getCurrentUser();
            console.log(cognitoUser);
            if (!cognitoUser) {
                resolve(false);
                return;
            }
            cognitoUser.getSession(
                (error: Error | null, session: CognitoUserSession | null) => {
                    console.log(error, session);
                    if (!!error) {
                        reject(error);
                        return;
                    }
                    resolve(session?.isValid() ?? false);
                },
            );
        });
    }

    public static getInstance(): AuthService {
        if (!AuthService.#INSTANCE) {
            AuthService.#INSTANCE = new AuthService();
        }
        return AuthService.#INSTANCE;
    }
}
