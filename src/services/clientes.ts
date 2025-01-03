import { IResBackend } from '../interfaces';
import apiClient from './axios.config';

export const obtenerClienteByUsuarioId = async (usuario_id: number): Promise<IResBackend> => {
    try {
        const response = await apiClient.get(`/cliente/usuario/${usuario_id}`);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerCategorias'
        };
    }
};