export const roleRoutes: any = {
    Cliente: ['/', '/catalogo', '/catalogo/checkout', '/misordenes'],
    Operador: [
        '/',
        '/productos',
        '/productos/crear',
        '/productos/actualizar/:producto_id',
        '/categorias',
        '/categorias/crear',
        '/categorias/actualizar/:categoria_producto_id',
        '/usuarios',
        '/usuarios/crear',
        '/usuarios/actualizar/:usuario_id',
        '/ordenes'
    ]
};
