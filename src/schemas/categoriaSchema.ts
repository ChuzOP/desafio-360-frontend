
import { object, string, number, date, InferType } from 'yup';

export const categoriaSchema = object({
    categoria: string().required()
});

export const categoriaUpdateSchema = object({
    nueva_categoria: string().required(),
    estado_id: number().min(1, 'El estado debe ser una opción valida.').required(),
});