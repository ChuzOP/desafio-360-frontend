export interface IOrdenes {
    orden_id:           number;
    cliente_id:         number;
    estado_id:          number;
    direccion:          string;
    telefono:           string;
    correo_electronico: string;
    fecha_entrega:      Date;
    created_at:         Date;
    updated_at:         Date;
    total_orden:        number;
    estado:             string;
    cliente_nombre:     string;
    detalle_orden:      DetalleOrden[];
}

export interface DetalleOrden {
    orden_detalle_id: number;
    producto_id:      number;
    cantidad:         number;
    precio:           number;
    subtotal:         number;
}
