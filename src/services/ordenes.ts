import { IResBackend } from '../interfaces';
import apiClient from './axios.config';

export const crearOrden = async (data: any): Promise<IResBackend> => {
    try {
        const response = await apiClient.post<any>('/orden', data);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en crearOrden'
        };
    }
};

export const obtenerOrdenes = async (): Promise<IResBackend> => {
    try {
        const response = await apiClient.get('/orden');

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerOrdenes'
        };
    }
};