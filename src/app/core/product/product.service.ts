import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private apiService: ApiService) { }

    // Obtener la lista de productos con paginación
    async getAllProducts(page: number = 1, limit: number = 10): Promise<any[]> {
        try {
            const response = await this.apiService.get('/products', {
                params: { page, limit },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los productos', error);
            return [];
        }
    }

    // Obtener un producto por ID
    async getProductById(id: number): Promise<any> {
        try {
            const response = await this.apiService.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el producto', error);
            return null;
        }
    }

    // Crear un nuevo producto
    async createProduct(product: any): Promise<boolean> {
        try {
            await this.apiService.post('/products', product);
            return true;
        } catch (error) {
            console.error('Error al crear el producto', error);
            return false;
        }
    }

    // Actualizar un producto existente
    async updateProduct(id: number, product: any): Promise<boolean> {
        try {
            await this.apiService.put(`/products/${id}`, product);
            return true;
        } catch (error) {
            console.error('Error al actualizar el producto', error);
            return false;
        }
    }

    // Eliminar un producto
    async deleteProduct(id: number): Promise<boolean> {
        try {
            await this.apiService.delete(`/products/${id}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar el producto', error);
            return false;
        }
    }
}
