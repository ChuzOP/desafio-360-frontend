import { IResBackend } from '../interfaces';
import apiClient from './axios.config';

export const obtenerUsuarios = async (): Promise<IResBackend> => {
    try {
        const response = await apiClient.get('/usuario');

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerUsuarios'
        };
    }
};

export const crearUsuario = async (data: any): Promise<IResBackend> => {
    try {
        const response = await apiClient.post<any>('/auth/registerUser', data);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en crearUsuario'
        };
    }
};

export const updateUsuario = async (usuario_id: string, data: any): Promise<IResBackend> => {
    try {
        const response = await apiClient.put(`/usuario/${usuario_id}`, data);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en updateUsuario'
        };
    }
};

export const obtenerUsuarioById = async (usuario_id: string): Promise<IResBackend> => {
    try {
        const response = await apiClient.get(`/usuario/${usuario_id}`);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerUsuarioById'
        };
    }
};