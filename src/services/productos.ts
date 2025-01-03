import { IResBackend } from '../interfaces';
import apiClient from './axios.config';

export const crearProducto = async (data: any): Promise<IResBackend> => {
    try {
        const response = await apiClient.post<any>('/producto', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en crearProducto'
        };
    }
};

export const obtenerProductos = async (): Promise<IResBackend> => {
    try {
        const response = await apiClient.get('/producto');

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerProductos'
        };
    }
};