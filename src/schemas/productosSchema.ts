import { object, string, number, mixed, array } from 'yup';

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
            if (!value) return true;
            return value instanceof File;
        }).required()
});

export const shippingAddressSchema = object().shape({
    cliente_id: number().min(1, 'El cliente debe ser una opción valida.').required(),
    direccion: string().required(),
    telefono: number().required(),
    correo_electronico: string().email('El correo electrónico debe ser válido.').required(),
    fecha_entrega: string()
        .required('La fecha de entrega es obligatoria.')
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            'La fecha debe tener el formato YYYY-MM-DD.'
        ),
    orden_detalle: array().min(1, 'Debe agregar al menos un producto para realizar la orden.').required()
});

export const productoUpdateSchema = object().shape({
    producto_id: number().min(1, 'El producto debe ser una opción valida.').required(),
    categoria_producto_id: number().min(1, 'La categoria debe ser una opción valida.').required(),
    estado_id: number().min(1, 'El estado debe ser una opción valida.').required(),
    nombre: string().max(100, 'El nombre no puede exceder los 100 caracteres.').required(),
    marca: string().max(100, 'La marca no puede exceder los 100 caracteres.').nullable(),
    codigo: string().max(100, 'El código no puede exceder los 100 caracteres.').nullable(),
    stock: number().min(0, 'El stock no puede ser negativo.').default(0),
    precio: number().min(1, 'El precio debe ser un número positivo.').required(),
    imagen: mixed()
        .test('fileType', 'La imagen debe ser un archivo válido.', (value) => {
            if (!value) return true;
            return value instanceof File;
        }).required()
});