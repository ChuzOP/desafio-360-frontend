import { object, string, number, date, InferType } from 'yup';

export const usuarioCreateSchema = object({
    nombre: string().min(2).max(100).required(),
    correo_electronico: string().email().required(),
    password: string().required(),
    rol_id: number()
        .min(1, 'El producto debe ser una opción valida.')
        .required(),
    nombre_completo: string().min(2).max(100).optional(),
    telefono: string()
        .matches(/^\d{8}$/, 'Debe ser un número de teléfono válido de 8 dígitos.')
        .optional(),
    direccion: string().optional()
});

export const usuarioUpdateSchema = object({
    usuario_id: number().min(1, 'El Usuario debe ser una opción valida.').required(),
    estado_id: number().min(1, 'El estado debe ser una opción valida.').required(),
    nombre: string().min(2).max(100).required(),
    correo_electronico: string().email().required(),
    rol_id: number()
        .min(1, 'El producto debe ser una opción valida.')
        .required(),
});