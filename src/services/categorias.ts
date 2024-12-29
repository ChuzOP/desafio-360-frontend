import { IResBackend } from '../interfaces';
import apiClient from './axios.config';

export const obtenerCategorias = async (): Promise<IResBackend> => {
    try {
        const response = await apiClient.get('/categoria');

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerCategorias'
        };
    }
};

export const obtenerCategoriaById = async (categoria_producto_id: string): Promise<IResBackend> => {
    try {
        const response = await apiClient.get(`/categoria/${categoria_producto_id}`);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerCategorias'
        };
    }
};

export const crearCategoria = async (data: any): Promise<IResBackend> => {
    try {
        const response = await apiClient.post<any>('/categoria', data);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en crearCategoria'
        };
    }
};

export const actualizarCategoria = async (categoria_producto_id: string, data: any): Promise<IResBackend> => {
    try {
        const response = await apiClient.put<any>(`/categoria/${categoria_producto_id}`, data);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en actualizarCategoria'
        };
    }
};