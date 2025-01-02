export interface IGetProducto {
    producto_id:           number;
    categoria_producto_id: number;
    estado_id:             number;
    nombre:                string;
    marca:                 string;
    codigo:                string;
    stock:                 number;
    precio:                number;
    imagen:                Imagen;
    nombre_estado:         string;
    nombre_categoria:      string;
}

export interface Imagen {
    type: string;
    data: number[];
}