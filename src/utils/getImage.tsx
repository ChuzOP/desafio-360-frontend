import { Imagen } from "../interfaces";

export const getImage = (imagen: Imagen | File): string => {
    if (imagen instanceof File) {
        return URL.createObjectURL(imagen);
    }

    const blob = new Blob([new Uint8Array(imagen.data)], {
        type: imagen.type,
    });
    return URL.createObjectURL(blob);
};
