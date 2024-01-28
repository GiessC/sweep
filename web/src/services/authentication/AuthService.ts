import envConfig from '@/config/env';
import NoAuthenticatedUserError from '@/errors/authentication/NoAuthenticatedUserError';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    ISignUpResult,
} from 'amazon-cognito-identity-js';

const USER_POOL_ID = envConfig.Cognito.USER_POOL_ID;
const CLIENT_ID = envConfig.Cognito.CLIENT_ID;

if (!CLIENT_ID || !USER_POOL_ID) {
    console.error(
        'Missing Cognito CLIENT_ID or USER_POOL_ID. AuthService will be unavailable!',
    );
}

export default class AuthService {
    private static USER_POOL: CognitoUserPool = new CognitoUserPool({
        ClientId: CLIENT_ID ?? '',
        UserPoolId: USER_POOL_ID ?? '',
        // Storage: localStorage, // TODO: Implement a better storage solution
    });

    private static async handleLoginSuccess(resolve: (value: boolean) => void) {
        resolve(true);
    }

    private static async handleLoginFailure(
        error: unknown,
        reject: (reason?: unknown) => void,
    ) {
        reject(error);
    }

    public static async login(
        username: string,
        password: string,
        redirectToMfa: () => void,
    ): Promise<boolean> {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: AuthService.USER_POOL,
        });
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });
        return await new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: () => AuthService.handleLoginSuccess(resolve),
                onFailure: (error: unknown) =>
                    AuthService.handleLoginFailure(error, reject),
                mfaRequired: () => redirectToMfa(),
            });
        });
    }

    public static async logout(): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            const cognitoUser = AuthService.USER_POOL.getCurrentUser();
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

    public static async signUp(
        username: string,
        password: string,
    ): Promise<ISignUpResult | undefined> {
        return await new Promise((resolve, reject) => {
            AuthService.USER_POOL.signUp(
                username,
                password,
                [],
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
}
