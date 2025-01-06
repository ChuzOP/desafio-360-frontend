import { IResBackend } from '../interfaces';
import apiClient from './axios.config';

export const crearOrden = async (data: any): Promise<IResBackend> => {
    try {
        const detalleFormated = data.orden_detalle.map((producto: any) => {
            return {
                producto_id: Number(producto.producto_id),
                cantidad: producto.cantidad,
                precio: `${producto.cantidad}`,
            }
        });

        const dataFormated = {
            ...data,
            orden_detalle: detalleFormated
        };

        console.log(dataFormated);

        const response = await apiClient.post<any>('/orden', dataFormated);

        return response.data;
    } catch (error: any) {
        console.log(error);
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

export const obtenerOrdenesByUsuarioId = async (usuario_id: number): Promise<IResBackend> => {
    try {
        const response = await apiClient.get('/orden');

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en obtenerOrdenesByUsuarioId'
        };
    }
};

export const aprobarOrden = async (orden_id: number): Promise<IResBackend> => {
    try {
        const response = await apiClient.put<any>(`/orden/aprobar/${orden_id}`);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en aprobarOrden'
        };
    }
};

export const cancelarOrden = async (orden_id: number): Promise<IResBackend> => {
    try {
        const response = await apiClient.put<any>(`/orden/cancelar/${orden_id}`);

        return response.data;
    } catch (error: any) {
        return {
            status: error?.response?.status ?? 500,
            success: false,
            message: error?.response?.data?.message ?? 'Error en cancelarOrden'
        };
    }
};