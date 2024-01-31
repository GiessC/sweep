import type {
    ConfirmUserRequest,
    LoginRequest,
    SignUpRequest,
} from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { createContext, useState } from 'react';

export interface IAuthContext {
    isAuthenticated: boolean;
    login: (
        request: LoginRequest,
        redirectToMfa: () => void,
    ) => Promise<boolean>;
    logout: () => Promise<boolean>;
    signUp: (request: SignUpRequest) => Promise<ISignUpResult | undefined>;
    confirmUser: (request: ConfirmUserRequest) => Promise<void>;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    login: () => Promise.resolve(false),
    logout: () => Promise.resolve(false),
    signUp: () => Promise.resolve(undefined),
    confirmUser: () => Promise.resolve(),
    setIsAuthenticated: () => {},
});

export interface AuthProviderProps {
    children: JSX.Element;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const auth = useAuth();

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
