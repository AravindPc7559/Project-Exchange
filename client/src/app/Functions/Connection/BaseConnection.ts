import axios, { Method } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3006/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});``

interface RequestOptions {
    method: Method;
    route: string;
    data?: any;
    headers?: Record<string, string>;
    useAuth?: boolean;
}

export const BaseConnection = async ({ method, route, data, headers, useAuth = true }: RequestOptions) => {
    try {
        const response = await api.request({
            method,
            url: route,
            data,
            headers: {
                ...headers,
                ...(useAuth
                    ? (() => {
                        const token = sessionStorage.getItem('jwt');
                        return token ? { Authorization: `Bearer ${token}` } : {};
                    })()
                    : {}),
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
