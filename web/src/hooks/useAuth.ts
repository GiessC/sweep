import { IAuthContext } from '@/context/AuthContext';
import AuthService from '@/services/authentication/AuthService';
import { ISignUpResult } from 'amazon-cognito-identity-js';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface SignUpRequest {
    email: string;
    username: string;
    password: string;
    confirmPassword?: string;
}

export interface ConfirmUserRequest {
    username: string;
    code: string;
}

export const useAuth = (): Omit<
    IAuthContext,
    'isAuthenticated' | 'setIsAuthenticated'
> => ({
    login: async (
        request: LoginRequest,
        redirectToMfa: () => void,
    ): Promise<boolean> => {
        return await AuthService.getInstance().login(
            request.username,
            request.password,
            redirectToMfa,
        );
    },
    logout: async (): Promise<boolean> => {
        return await AuthService.getInstance().logout();
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
            request.code,
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
});
