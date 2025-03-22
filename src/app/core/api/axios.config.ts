import axios from 'axios';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const apiService = () => {
    const cookieService = inject(CookieService);
    const baseURL = environment.API_URL;

    if (!baseURL) {
        throw new Error('Variable de entorno API_URL no se encuentra definida');
    }

    const instance = axios.create({
        baseURL: baseURL,
    });

    instance.interceptors.request.use((config) => {
        const token = cookieService.get('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            return Promise.reject(error);
        },
    );
    return instance;
};


export default apiService;