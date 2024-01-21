import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { getBaseUrl } from './getBaseUrl';

const axiosConfig = (body?: unknown, headers?: AxiosHeaders) => ({
    // baseURL: getBaseUrl(),
    data: body,
    headers: {
        ...headers,
    },
});

export const axiosGet = <T>(
    endpoint: string,
    body?: unknown,
    headers?: AxiosHeaders,
): Promise<AxiosResponse<T>> => {
    return axios.get<T>(
        `${getBaseUrl()}${endpoint}`,
        axiosConfig(body, headers),
    );
};

export const axiosPost = <T>(
    endpoint: string,
    body?: unknown,
    headers?: AxiosHeaders,
): Promise<AxiosResponse<T>> => {
    return axios.post<T>(
        `${getBaseUrl()}${endpoint}`,
        axiosConfig(body, headers),
    );
};

export const axiosPatch = <T>(
    endpoint: string,
    body?: unknown,
    headers?: AxiosHeaders,
): Promise<AxiosResponse<T>> => {
    return axios.patch<T>(
        `${getBaseUrl()}${endpoint}`,
        axiosConfig(body, headers),
    );
};

export const axiosDelete = <T>(
    endpoint: string,
    body?: unknown,
    headers?: AxiosHeaders,
): Promise<AxiosResponse<T>> => {
    return axios.delete<T>(
        `${getBaseUrl()}${endpoint}`,
        axiosConfig(body, headers),
    );
};
