import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidator {
    static noWhitespaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (control.value && control.value.trim().length === 0) {
            return { whitespace: 'El campo no puede estar vacío o contener solo espacios' };
        }
        return null;
    };

    static requiredField(message: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value?.trim() ? null : { required: message };
        };
    }

    static emailFormat(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(control.value) ? null : { email: 'Formato de correo inválido' };
        };
    }

    static decimalValidator(maxDecimals: number = 2): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null; // Permitir valores vacíos, manejar esto con un required aparte si es necesario
            }

            const decimalRegex = new RegExp(`^\\d+(\\.\\d{1,${maxDecimals}})?$`);
            const isValid = decimalRegex.test(control.value);

            return isValid ? null : { decimalError: `El valor debe tener hasta ${maxDecimals} decimales.` };
        };
    }
}
