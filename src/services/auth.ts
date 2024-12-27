import { IResBackend } from '../interfaces';
import apiClient from './axios.config';

export const loginService = async (data: any): Promise<IResBackend> => {
    try {
        const response = await apiClient.post<any>('/auth/loginUser', data);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en loginService'
        };
    }
};
