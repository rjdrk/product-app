import { Injectable } from '@angular/core';
import apiService from './axios.config'; // Importa la instancia de Axios

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private axiosInstance = apiService();

  async get(url: string, params?: any) {
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      console.error(`Error al realizar GET a ${url}:`, error);
      throw error;
    }
  }

  async post(url: string, data?: any) {
    try {
      console.log('data', data);
      const response = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error al realizar POST a ${url}:`, error);
      throw error;
    }
  }

  async put(url: string, data?: any) {
    try {
      const response = await this.axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      console.error(`Error al realizar PUT a ${url}:`, error);
      throw error;
    }
  }

  async delete(url: string, params?: any) {
    try {
      const response = await this.axiosInstance.delete(url, { params });
      return response.data;
    } catch (error) {
      console.error(`Error al realizar DELETE a ${url}:`, error);
      throw error;
    }
  }
}