import envConfig from '@/config/env';
import NoAuthenticatedUserError from '@/errors/authentication/NoAuthenticatedUserError';
import {
    AuthenticationDetails,
    CognitoIdToken,
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

    public async forgotPassword(
        username: string,
        email: string,
        redirectToForgotPasswordCode: () => void,
    ): Promise<void> {
        // TODO: Check if the email and username match (using DynamoDB)
        // TODO: Check if the user has forgotten their password too recently (DynamoDB - needs added field in user table)
        return await new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: this.userPool,
            });
            cognitoUser.forgotPassword({
                onSuccess: () => resolve(),
                onFailure: reject,
                inputVerificationCode: () => {
                    redirectToForgotPasswordCode();
                    resolve();
                },
            });
        });
    }

    public async forgotUsername(email: string): Promise<string> {
        // TODO: This needs to use an email service.
        return '';
    }

    public async confirmPassword(
        username: string,
        code: string,
        newPassword: string,
    ): Promise<void> {
        return await new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: this.userPool,
            });
            cognitoUser.confirmPassword(code, newPassword, {
                onSuccess: () => resolve(),
                onFailure: reject,
            });
        });
    }

    public async resetPassword(
        currentPassword: string,
        newPassword: string,
    ): Promise<void> {
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
            cognitoUser.changePassword(
                currentPassword,
                newPassword,
                (error?: unknown) => {
                    if (!!error) {
                        reject(error);
                        return;
                    }
                    resolve();
                },
            );
        });
    }

    public async getIdToken(): Promise<CognitoIdToken | undefined> {
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
            cognitoUser.getSession((error: Error | null, session?: any) => {
                if (!!error) {
                    reject(error);
                    return;
                }
                resolve(session.getIdToken().getJwtToken());
            });
        });
    }

    public static getInstance(): AuthService {
        if (!AuthService.#INSTANCE) {
            AuthService.#INSTANCE = new AuthService();
        }
        return AuthService.#INSTANCE;
    }
}
