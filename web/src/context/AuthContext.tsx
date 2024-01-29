import type { LoginRequest, SignUpRequest } from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { createContext } from 'react';

export interface IAuthContext {
    login: (
        request: LoginRequest,
        redirectToMfa: () => void,
    ) => Promise<boolean>;
    logout: () => Promise<boolean>;
    signUp: (request: SignUpRequest) => Promise<ISignUpResult | undefined>;
    confirmUser: (code: string) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
    login: () => Promise.resolve(false),
    logout: () => Promise.resolve(false),
    signUp: () => Promise.resolve(undefined),
    confirmUser: () => Promise.resolve(),
});

export interface AuthProviderProps {
    children: JSX.Element;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
