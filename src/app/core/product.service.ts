import axiosInstance from './axios.config';

export class ProductService {
    // Obtener la lista de productos con paginación
    async getAllProducts(page: number = 1, limit: number = 10): Promise<any[]> {
        try {
            const response = await axiosInstance.get('/products', {
                params: { page, limit },
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener los productos', error);
            return [];
        }
    }

    // Obtener un producto por ID
    async getProductById(id: number): Promise<any> {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el producto', error);
            return null;
        }
    }

    // Crear un nuevo producto
    async createProduct(product: any): Promise<boolean> {
        try {
            await axiosInstance.post('/products', product);
            return true;
        } catch (error) {
            console.error('Error al crear el producto', error);
            return false;
        }
    }

    // Actualizar un producto existente
    async updateProduct(id: number, product: any): Promise<boolean> {
        try {
            await axiosInstance.put(`/products/${id}`, product);
            return true;
        } catch (error) {
            console.error('Error al actualizar el producto', error);
            return false;
        }
    }

    // Eliminar un producto
    async deleteProduct(id: number): Promise<boolean> {
        try {
            await axiosInstance.delete(`/products/${id}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar el producto', error);
            return false;
        }
    }
}
