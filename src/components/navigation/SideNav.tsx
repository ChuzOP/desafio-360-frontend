import { Box, List } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import {
    Logout,
    LogoutOutlined,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';

import { logoutService } from '../../services';
import { AppContext, AuthContext } from '../../context';
import { navList } from '../../utils';
import { NavItem } from './NavItem';

export const SideNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
    const { setIsAuthenticated, setUserData, userData } = useContext(AuthContext);
    const { clearCart } = useContext(AppContext);

    const handleLogOut = async () => {
        try {
            const res = await logoutService();
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                navigate('/login');
                setTimeout(() => {
                    clearCart();
                    setIsAuthenticated(false);
                    setUserData({
                        user_id: 0,
                        rol_id: 0,
                        nombre: '',
                        rol_nombre: '',
                    });
                }, 1500);
            } else {
                enqueueSnackbar(res.message, {
                    variant: 'error'
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isActiveRoute = (href: string) => {
        const currentPath = location.pathname;
        return currentPath === href || currentPath.startsWith(`${href}/`);
    };

    const filteredNavList = navList.filter((item) => item.rol === userData.rol_nombre);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '75%'
            }}
        >
            <List>
                {filteredNavList.map((item) => (
                    <NavItem
                        key={item.href}
                        {...item}
                        isActive={isActiveRoute(item.href)}
                    />
                ))}
            </List>
            <List>
                <NavItem
                    text="Cerrar sesión"
                    icon={<LogoutOutlined />}
                    iconFulled={<Logout />}
                    handleClick={handleLogOut}
                />
            </List>
        </Box>
    );
};
