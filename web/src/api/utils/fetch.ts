import envConfig from '@/config/env';

const API_URL = envConfig.API.URL;

export const fetchGet = <O = undefined>(
    url: string,
    urlParams?: O,
    headers?: Record<string, string>,
): Promise<Response> => {
    return fetch(
        `${API_URL}${url}?${new URLSearchParams({
            ...urlParams,
        })}`,
        {
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: 'cors',
        },
    );
};

export const fetchPost = <O = undefined>(
    url: string,
    body?: O,
    headers?: Record<string, string>,
): Promise<Response> => {
    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(body),
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
    });
};

export const fetchPatch = <O = undefined>(
    url: string,
    body?: O,
    headers?: Record<string, string>,
): Promise<Response> => {
    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(body),
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        method: 'PATCH',
        mode: 'cors',
    });
};

export const fetchDelete = <O = undefined>(
    url: string,
    body?: O,
    headers?: Record<string, string>,
): Promise<Response> => {
    return fetch(`${API_URL}${url}`, {
        body: JSON.stringify(body),
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
        mode: 'cors',
    });
};
