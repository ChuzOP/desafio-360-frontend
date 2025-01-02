import { object, string, number, mixed } from 'yup';

export const productoCreateSchema = object().shape({
    categoria_producto_id: number().min(1, 'La categoria debe ser una opción valida.').required(),
    estado_id: number().min(1, 'El estado debe ser una opción valida.').required(),
    nombre: string().max(100, 'El nombre no puede exceder los 100 caracteres.').required(),
    marca: string().max(100, 'La marca no puede exceder los 100 caracteres.').nullable(),
    codigo: string().max(100, 'El código no puede exceder los 100 caracteres.').nullable(),
    stock: number().min(0, 'El stock no puede ser negativo.').default(0),
    precio: number().min(1, 'El precio debe ser un número positivo.').required(),
    imagen: mixed()
        .test('fileType', 'La imagen debe ser un archivo válido.', (value) => {
            if (!value) return true; // Si no hay valor, está bien
            return value instanceof File; // Asegúrate de que sea una instancia de File
        }).required()
});
