import { Component, OnInit } from "@angular/core";
import { ProductService } from '../../core/product/product.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { ProductModalComponent } from "../product/product-modal.component";
import { FormsModule } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
    selector: "app-products",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        ProductModalComponent
    ],
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
})

export class ProductsComponent implements OnInit {
    isModalOpen = false;
    isEditing = false;
    isView = false;
    selectedProduct: any = null;
    products: any[] = [];
    totalItems: number = 0;
    totalPages: number = 0;
    currentPage: number = 1;
    limit: number = 5;
    private refresh$ = new Subject<void>();

    constructor(private productService: ProductService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.refresh$.subscribe(() => this.loadProducts());
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.getAllProducts(this.currentPage, this.limit).subscribe(
            (response: any) => {
                console.log('Productos obtenidos:', response);
                this.products = response.data.map((product: any) => ({
                    ...product,
                    estado: product.estado === 0 ? 'Activo' : 'Inactivo'
                }));
                this.totalPages = response.totalPages;
            },
            (error: any) => {
                console.error('Error al obtener los productos', error);
            }
        );
    }

    deleteProduct(product: any): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar el producto "${product.nombre}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.productService.deleteProduct(product.idProducto).subscribe(() => {
                    this.loadProducts();
                    this.toastr.success('Producto eliminado con éxito', 'Éxito');
                });
            }
        });
    }

    openProductModalAdd(): void {
        this.isModalOpen = true;
        this.isEditing = false;
        this.isView = false;
        this.selectedProduct = null;
    }

    openProductModalEdit(product: any): void {
        this.isModalOpen = true;
        this.isEditing = true;
        this.isView = false;
        this.selectedProduct = product;
        console.log('selectedProduct:', this.selectedProduct);
    }

    openProductModalView(product: any): void {
        console.log('isView:', this.isView);
        this.isModalOpen = true;
        this.isEditing = false;
        this.isView = true;
        this.selectedProduct = product;
    }

    closeProductModal() {
        this.isModalOpen = false;
        this.loadProducts();
    }

    saveProduct(productData: any): void {
        console.log('Producto a guardar:', productData);
        if (this.isEditing) {
            this.productService.updateProduct(productData.id, productData).subscribe(() => {
                this.loadProducts();
                this.toastr.success('Producto actualizado con éxito', 'Éxito');
            });
        } else {
            this.productService.createProduct(productData).subscribe(() => {
                this.loadProducts();
                this.toastr.success('Producto Guardado con éxito', 'Éxito');
            });
        }
        this.isModalOpen = false;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadProducts();
            this.refresh$.next();
        }
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadProducts();
            this.refresh$.next();
        }
    }

    refreshProducts(): void {
        this.refresh$.next();
    }
}