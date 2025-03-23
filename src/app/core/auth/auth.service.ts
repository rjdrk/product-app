import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { ApiService } from '../api/api.service';
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})

export class AuthService {
    private tokenKey = 'jwtToken';

    constructor(private cookieService: CookieService, private router: Router, private apiService: ApiService) { }

    async login(username: string, password: string) {
        try {
            const response = await this.apiService.post("/auth/login", {
                username,
                password,
            });
            if (response && response.token) {
                this.cookieService.set(this.tokenKey, response.token, 1, '/');
                return true;
            }
            return false;

        } catch (error) {
            console.error("Error al iniciar sesión", error);
            return false;
        }
    }

    async logout() {
        this.cookieService.delete(this.tokenKey);
        window.location.href = "/login";
    }

    isAuthenticated(): boolean {
        const token = this.cookieService.get(this.tokenKey);

        if (!token) {
            return false;
        }

        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        if (expiry * 1000 < Date.now()) {
            this.logout();
            return false;
        }

        return true;
    }
}