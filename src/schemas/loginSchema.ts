import { object, string, number, date, InferType } from 'yup';

export const loginSchema = object({
    correo_electronico: string().email().required(),
    password: string().required()
});
