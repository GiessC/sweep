import envConfig from '@/config/env';
import AuthService from '@/services/authentication/AuthService';
import type { UserAuth } from '@/services/authentication/AuthService';

const API_URL = envConfig.API.URL;

const tokenExpired = (user: UserAuth): boolean => {
    return new Date(user.token.getExpiration()) <= new Date();
};

const getHeaders = async (headers: Record<string, string> = {}) => {
    const allHeaders: Record<string, string> = {
        ...headers,
        'Content-Type': 'application/json',
    };
    let user = AuthService.getInstance().user;
    if (user && tokenExpired(user)) {
        user = await AuthService.getInstance().refreshIdToken();
    }
    if (user) {
        allHeaders.Authorization = `Bearer ${user.token.getJwtToken()}`;
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
