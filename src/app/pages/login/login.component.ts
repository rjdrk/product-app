import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormValidator } from "../../core/validators/form.validator";

@Component({
    selector: "app-login",
    imports: [ReactiveFormsModule, FormsModule, NgIf],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})


export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, FormValidator.noWhitespaceValidator]],
            password: ['', [Validators.required, FormValidator.noWhitespaceValidator]],
        }, { updateOn: 'change' });
    }

    async login() {
        this.loginForm.updateValueAndValidity();

        console.log(this.loginForm.invalid)
        if (this.loginForm.invalid) {
            this.errorMessage = 'Por favor, complete todos los campos.';
            return;
        }

        const { username, password } = this.loginForm.value

        const success = await this.authService.login(username, password);

        if (success) {
            this.router.navigate(['/products']);
        } else {
            this.errorMessage = 'Credenciales incorrectas, intente de nuevo.';
        }
    }
}