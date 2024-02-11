import envConfig from '@/config/env';
import AuthService from '@/services/authentication/AuthService';
import type { CognitoIdToken } from 'amazon-cognito-identity-js';

const API_URL = envConfig.API.URL;

const tokenExpired = (token: CognitoIdToken): boolean => {
    return new Date(token.getExpiration()) <= new Date();
};

const getHeaders = async (headers: Record<string, string> = {}) => {
    const allHeaders: Record<string, string> = {
        ...headers,
        'Content-Type': 'application/json',
    };
    const idToken = await AuthService.getInstance().getIdToken();
    const refreshToken = await AuthService.getInstance().getRefreshToken();
    if (idToken && refreshToken && tokenExpired(idToken)) {
        await AuthService.getInstance().refreshIdToken(refreshToken);
    }
    if (idToken) {
        allHeaders.Authorization = `Bearer ${idToken.getJwtToken()}`;
    }
    return allHeaders;
};

export const fetchGet = async <O = undefined>(
    url: string,
    urlParams?: O,
    headers?: Record<string, string>,
): Promise<Response> => {
    const allHeaders = await getHeaders(headers);
    return fetch(
        `${API_URL}${url}?${new URLSearchParams({
            ...urlParams,
        })}`,
        {
            headers: allHeaders,
            method: 'GET',
            mode: 'cors',
        },
    );
};

export const fetchPost = async <O = undefined>(
    url: string,
    body?: O,
    headers?: Record<string, string>,
): Promise<Response> => {
    const allHeaders = await getHeaders(headers);
    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(body),
        headers: allHeaders,
        method: 'POST',
        mode: 'cors',
    });
};

export const fetchPatch = async <O = undefined>(
    url: string,
    body?: O,
    headers?: Record<string, string>,
): Promise<Response> => {
    const allHeaders = await getHeaders(headers);
    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(body),
        headers: allHeaders,
        method: 'PATCH',
        mode: 'cors',
    });
};

export const fetchDelete = async <O = undefined>(
    url: string,
    body?: O,
    headers?: Record<string, string>,
): Promise<Response> => {
    const allHeaders = await getHeaders(headers);
    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(body),
        headers: allHeaders,
        method: 'DELETE',
        mode: 'cors',
    });
};
