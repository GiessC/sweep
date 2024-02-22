import type { ConfirmUserRequest } from '@/components/auth/confirm-user/ConfirmUserForm';
import type { LoginRequest } from '@/components/auth/login/LoginForm';
import type { SignUpRequest } from '@/components/auth/sign-up/SignupForm';
import AuthService from '@/services/authentication/AuthService';
import type {
    CognitoIdToken,
    CognitoRefreshToken,
    ISignUpResult,
} from 'amazon-cognito-identity-js';
import { createContext, useEffect, useMemo, useState } from 'react';

export interface UserAuth {
    userId: string;
    token: CognitoIdToken;
    refreshToken: CognitoRefreshToken;
}

export interface IAuthContext {
    user: UserAuth | null;
    authenticated: boolean;
    validating: boolean;
    login: (
        request: LoginRequest,
        redirectToMfa: () => void,
    ) => Promise<boolean>;
    logout: () => Promise<boolean>;
    signUp: (request: SignUpRequest) => Promise<ISignUpResult | undefined>;
    confirmUser: (request: ConfirmUserRequest) => Promise<void>;
    forgotPassword: (
        username: string,
        email: string,
        redirectToForgotPasswordCode: () => void,
    ) => Promise<void>;
    confirmPassword: (
        username: string,
        code: string,
        newPassword: string,
    ) => Promise<void>;
    resetPassword: (
        currentPassword: string,
        newPassword: string,
    ) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    authenticated: false,
    validating: true,
    login: () => Promise.resolve(false),
    logout: () => Promise.resolve(false),
    signUp: () => Promise.resolve(undefined),
    confirmUser: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    confirmPassword: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
});

export interface AuthProviderProps {
    children: JSX.Element;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [validating, setValidating] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserAuth | null>(null);

    useEffect(() => {
        setValidating(true);
        const validate = async () => {
            try {
                const session = await AuthService.getInstance().getSession();
                if (!session) {
                    setAuthenticated(false);
                    setValidating(false);
                    return;
                }
                const idToken = session.getIdToken();
                const decoded = idToken.decodePayload();
                setUser({
                    userId: decoded.sub,
                    token: idToken,
                    refreshToken: session.getRefreshToken(),
                });
                setAuthenticated(true);
                setValidating(false);
            } catch (error: unknown) {
                setAuthenticated(false);
                setValidating(false);
            }
        };

        validate();
    }, []);

    const contextValue = useMemo<IAuthContext>(
        () => ({
            validating,
            authenticated,
            user,
            login: async (
                request: LoginRequest,
                redirectToMfa: () => void,
            ): Promise<boolean> => {
                const response = await AuthService.getInstance().login(
                    request.username,
                    request.password,
                    redirectToMfa,
                    () => {
                        setAuthenticated(true);
                    },
                );
                return response;
            },
            logout: async (): Promise<boolean> => {
                const response = await AuthService.getInstance().logout(
                    user,
                    () => {
                        setAuthenticated(false);
                    },
                );
                setAuthenticated(false);
                return response;
            },
            signUp: async (
                request: SignUpRequest,
            ): Promise<ISignUpResult | undefined> => {
                return await AuthService.getInstance().signUp(
                    request.email,
                    request.username,
                    request.password,
                );
            },
            confirmUser: async (request: ConfirmUserRequest): Promise<void> => {
                return await AuthService.getInstance().confirmUser(
                    request.username,
                    `${request.code}`,
                    () => {
                        setAuthenticated(true);
                    },
                );
            },
            forgotPassword: async (
                username: string,
                email: string,
                redirectToForgotPasswordCode: () => void,
            ): Promise<void> => {
                return await AuthService.getInstance().forgotPassword(
                    username,
                    email,
                    redirectToForgotPasswordCode,
                );
            },
            confirmPassword: async (
                username: string,
                code: string,
                newPassword: string,
            ): Promise<void> => {
                return await AuthService.getInstance().confirmPassword(
                    username,
                    code,
                    newPassword,
                );
            },
            resetPassword: async (
                currentPassword: string,
                newPassword: string,
            ): Promise<void> => {
                return await AuthService.getInstance().resetPassword(
                    currentPassword,
                    newPassword,
                );
            },
        }),
        [authenticated, user, validating],
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
