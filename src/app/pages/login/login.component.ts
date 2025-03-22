import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: "app-login",
    imports: [FormsModule, NgIf],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})


export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private router: Router, private authService: AuthService) { }

    async login() {
        const success = await this.authService.login(this.username, this.password);
        if (success) {
            this.router.navigate(['/products']);
        } else {
            this.errorMessage = 'Credenciales incorrectas, intente de nuevo.';
        }
    }
}