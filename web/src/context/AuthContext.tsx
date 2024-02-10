import NoAuthenticatedUserError from '@/errors/authentication/NoAuthenticatedUserError';
import type {
    ConfirmUserRequest,
    LoginRequest,
    SignUpRequest,
} from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import AuthService, { UserAuth } from '@/services/authentication/AuthService';
import type {
    CognitoIdToken,
    CognitoRefreshToken,
    ISignUpResult,
} from 'amazon-cognito-identity-js';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';

export interface IAuthContext {
    user: UserAuth | null;
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
    getIdToken: () => Promise<CognitoIdToken | undefined>;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    login: () => Promise.resolve(false),
    logout: () => Promise.resolve(false),
    signUp: () => Promise.resolve(undefined),
    confirmUser: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
    confirmPassword: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
    getIdToken: () => Promise.resolve(undefined),
});

export interface AuthProviderProps {
    children: JSX.Element;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                user: AuthService.getInstance().user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
