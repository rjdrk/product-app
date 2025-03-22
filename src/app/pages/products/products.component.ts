import { Component, OnInit } from "@angular/core";
import { ProductService } from '../../core/product/product.service';
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { NgFor } from "@angular/common";

@Component({
    selector: "app-products",
    imports: [NgFor],
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
})

export class ProductsComponent implements OnInit {
    products: any[] = [];
    currentPage: number = 1;
    limit: number = 10;

    constructor(private productService: ProductService, private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    async loadProducts() {
        this.products = await this.productService.getAllProducts(this.currentPage, this.limit);
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadProducts();
        }
    }

    nextPage() {
        this.currentPage++;
        this.loadProducts();
    }
}