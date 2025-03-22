import { Injectable } from "@angular/core";
import axiosInstance from './axios.config';

@Injectable({
    providedIn: "root",
})

export class AuthService {
    constructor() { }
    static async login(email: string, password: string) {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email,
                password,
            });
            if (response.data.token) {
                localStorage.setItem("jwtToken", response.data.token);
                return true;
            }
            return false;

        } catch (error) {
            console.error("Error al iniciar sesión", error);
            return false;
        }
    }

    static async logout() {
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            return false;
        }

        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        if (expiry * 1000 < Date.now()) {
            AuthService.logout();
            return false;
        }

        return true;
    }
}