import axios from 'axios';
import { environment } from '../environments/environment';

const baseURL = environment.API_URL;

if (!baseURL) {
    throw new Error('Variable de entorno API_URL no se encuentra definida');
}

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;