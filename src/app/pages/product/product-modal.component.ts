import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-product-modal',
    standalone: true,
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.css'],
    imports: [ReactiveFormsModule, NgIf]
})
export class ProductModalComponent implements OnInit {
    @Input() isModalOpen: boolean = false;
    @Input() isEditing: boolean = false;
    @Input() isView: boolean = false;
    @Input() productData: any = null;
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();
    productForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
        this.productForm = this.fb.group({
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
            precio: [0, [Validators.required, Validators.min(1)]],
            stock: [0, [Validators.required, Validators.min(1)]],
            estado: ['Activo', Validators.required],
        });
    }

    ngOnInit(): void {
        if ((this.isEditing || this.isView) && this.productData) {
            this.productForm.patchValue(this.productData);
        }
    }

    saveProduct(): void {
        //Validar formulario antes de guardar
        if (this.productForm.invalid) {
            Object.values(this.productForm.controls).forEach(control => control.markAsTouched());
            return;
        }

        const productToSave = {
            ...this.productForm.value,
            id: this.isEditing ? this.productData.idProducto : undefined,
        }

        if (this.productForm.valid) {
            this.save.emit(productToSave);
            this.closeModal();
        }
    }

    closeModal(): void {
        this.close.emit();
    }
}
