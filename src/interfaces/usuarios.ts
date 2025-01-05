export interface IUsuario {
    usuario_id:         number;
    nombre:             string;
    correo_electronico: string;
    created_at:         Date;
    rol_id:             number;
    rol:                string;
    estado_id:          number;
    estado_nombre:      string;
};