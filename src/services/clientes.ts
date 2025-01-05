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

export const obtenerClienteById = async (cliente_id: string): Promise<IResBackend> => {
    try {
        const response = await apiClient.get(`/cliente/${cliente_id}`);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerClienteById'
        };
    }
};

export const obtenerClientes = async (): Promise<IResBackend> => {
    try {
        const response = await apiClient.get('/cliente');

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerClientes'
        };
    }
};

export const updateCliente = async (cliente_id: string, data: any): Promise<IResBackend> => {
    try {
        const response = await apiClient.put(`/cliente/${cliente_id}`, data);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en updateCliente'
        };
    }
};

export const inactivateCliente = async (cliente_id: number): Promise<IResBackend> => {
    try {
        const response = await apiClient.put(`/cliente/inactivate/${cliente_id}`);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en inactivateCliente'
        };
    }
};