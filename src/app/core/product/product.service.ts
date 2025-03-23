import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private apiService: ApiService) { }

    // Obtener la lista de productos con paginación
    getAllProducts(page: number = 1, limit: number = 5): Observable<any> {
        return from(this.apiService.get(`/productos/?pageNumber=${page}&pageSize=${limit}`));
    }

    // Obtener un producto por ID
    async getProductById(id: number): Promise<any> {
        try {
            const response = await this.apiService.get(`/productos/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el producto', error);
            return null;
        }
    }

    // Crear un nuevo producto
    createProduct(product: any): Observable<any> {
        return from(this.apiService.post('/productos', product));
    }

    // Actualizar un producto existente
    updateProduct(id: number, product: any): Observable<any> {
        return from(this.apiService.put(`/productos/${id}`, product));
    }

    // Eliminar un producto
    deleteProduct(id: number): Observable<any> {
        return from(this.apiService.delete(`/productos/${id}`));
    }
}
