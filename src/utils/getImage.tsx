import { Imagen } from "../interfaces";


export const getImage = (imagen: Imagen): string => {
    const blob = new Blob([new Uint8Array(imagen.data)], {
        type: imagen.type
    });
    return URL.createObjectURL(blob);
};