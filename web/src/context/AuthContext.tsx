import type {
    ConfirmUserRequest,
    LoginRequest,
    SignUpRequest,
} from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import { getItem } from '@/utils/localStorage';
import { CognitoIdToken, ISignUpResult } from 'amazon-cognito-identity-js';
import { createContext, useEffect, useState } from 'react';

export interface IAuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
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
    isAuthenticated: false,
    setIsAuthenticated: () => {},
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
    // TODO: Automatically log users out/refresh token if token is expired
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const auth = useAuth();

    useEffect(() => {
        setIsAuthenticated(getItem('isAuthenticated') === 'true');
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                isAuthenticated,
                setIsAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
