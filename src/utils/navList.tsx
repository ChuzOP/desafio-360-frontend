import {
    Category,
    CategoryOutlined,
    List,
    ListOutlined,
    Person,
    PersonOutlined,
    Store,
    StoreOutlined
} from '@mui/icons-material';

export const navList = [
    {
        text: 'Catalogo',
        icon: <ListOutlined />,
        iconFulled: <List />,
        href: '/catalogo',
        rol: 'Cliente'
    },
    {
        text: 'Mis Ordenes',
        icon: <StoreOutlined />,
        iconFulled: <Store />,
        href: '/misordenes',
        rol: 'Cliente'
    },
    {
        text: 'Ordenes',
        icon: <StoreOutlined />,
        iconFulled: <Store />,
        href: '/ordenes',
        rol: 'Operador'
    },
    {
        text: 'Productos',
        icon: <ListOutlined />,
        iconFulled: <List />,
        href: '/productos',
        rol: 'Operador'
    },
    {
        text: 'Categorias',
        icon: <CategoryOutlined />,
        iconFulled: <Category />,
        href: '/categorias',
        rol: 'Operador'
    },
    {
        text: 'Usuarios',
        icon: <PersonOutlined />,
        iconFulled: <Person />,
        href: '/usuarios',
        rol: 'Operador'
    },
    {
        text: 'Clientes',
        icon: <PersonOutlined />,
        iconFulled: <Person />,
        href: '/clientes',
        rol: 'Operador'
    }
];
