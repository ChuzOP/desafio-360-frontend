import { IResBackend } from '../interfaces';
import apiClient from './axios.config';

export const obtenerEstados = async (): Promise<IResBackend> => {
    try {
        const response = await apiClient.get('/estado');

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerCategorias'
        };
    }
};