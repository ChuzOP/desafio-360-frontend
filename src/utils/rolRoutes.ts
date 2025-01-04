export const roleRoutes: any = {
    Cliente: ['/', '/catalogo', '/catalogo/checkout', '/misordenes'],
    Operador: [
        '/',
        '/productos',
        '/productos/crear',
        '/categorias',
        '/categorias/crear',
        '/categorias/actualizar/:categoria_producto_id',
        '/usuarios',
        '/ordenes'
    ]
};
