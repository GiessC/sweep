import { IAuthContext } from '@/context/AuthContext';
import AuthService from '@/services/authentication/AuthService';
import { ISignUpResult } from 'amazon-cognito-identity-js';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface SignUpRequest {
    username: string;
    password: string;
}

export const useAuth = (): IAuthContext => ({
    login: async (
        request: LoginRequest,
        redirectToMfa: () => void,
    ): Promise<boolean> => {
        return await AuthService.login(
            request.username,
            request.password,
            redirectToMfa,
        );
    },
    logout: async (): Promise<boolean> => {
        return await AuthService.logout();
    },
    signUp: async (
        request: SignUpRequest,
    ): Promise<ISignUpResult | undefined> => {
        return await AuthService.signUp(request.username, request.password);
    },
});
