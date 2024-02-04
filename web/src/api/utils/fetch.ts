import envConfig from '@/config/env';
import AuthService from '@/services/authentication/AuthService';

const API_URL = envConfig.API.URL;

const getHeaders = async (headers: Record<string, string> = {}) => ({
    ...headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await AuthService.getInstance().getIdToken()}`,
});

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
