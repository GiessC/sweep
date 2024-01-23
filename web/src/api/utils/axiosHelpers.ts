import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiURL } from '../../../config/settings.json';

const axiosConfig = (
    body?: unknown,
    headers?: AxiosHeaders,
): AxiosRequestConfig => ({
    // baseURL: ApiURL,
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
    return axios.get<T>(`${ApiURL}${endpoint}`, axiosConfig(body, headers));
};

export const axiosPost = <T>(
    endpoint: string,
    body?: unknown,
    headers?: AxiosHeaders,
): Promise<AxiosResponse<T>> => {
    return axios.post<T>(`${ApiURL}${endpoint}`, axiosConfig(body, headers));
};

export const axiosPatch = <T>(
    endpoint: string,
    body?: unknown,
    headers?: AxiosHeaders,
): Promise<AxiosResponse<T>> => {
    return axios.patch<T>(`${ApiURL}${endpoint}`, axiosConfig(body, headers));
};

export const axiosDelete = <T>(
    endpoint: string,
    body?: unknown,
    headers?: AxiosHeaders,
): Promise<AxiosResponse<T>> => {
    return axios.delete<T>(`${ApiURL}${endpoint}`, axiosConfig(body, headers));
};
