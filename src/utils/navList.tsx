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
        href: '/'
    },
    {
        text: 'Categorias',
        icon: <CategoryOutlined />,
        iconFulled: <Category />,
        href: '/categorias'
    },
    {
        text: 'Usuarios',
        icon: <PersonOutlined />,
        iconFulled: <Person />,
        href: '/usuarios'
    },
    {
        text: 'Ordenes',
        icon: <StoreOutlined />,
        iconFulled: <Store />,
        href: '/ordenes'
    }
];
