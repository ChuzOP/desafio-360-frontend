import { object, string, number, date, InferType } from 'yup';

export const clienteUpdateSchema = object({
    cliente_id: number()
        .min(1, 'El Cliente debe ser una opción valida.')
        .required(),
    nombre_completo: string().min(2).max(100).optional(),
    telefono: string()
        .matches(
            /^\d{8}$/,
            'Debe ser un número de teléfono válido de 8 dígitos.'
        )
        .optional(),
    direccion: string().optional()
});
