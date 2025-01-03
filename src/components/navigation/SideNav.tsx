import { Box, List } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import {
    Logout,
    LogoutOutlined,
    Person,
    PersonOutline
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';

import { logoutService } from '../../services';
import { AuthContext } from '../../context';
import { navList } from '../../utils';
import { NavItem } from './NavItem';

export const SideNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
    const { setIsAuthenticated, setUserData } = useContext(AuthContext);

    const handleLogOut = async () => {
        try {
            const res = await logoutService();
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                navigate('/login');
                setTimeout(() => {
                    setIsAuthenticated(false);
                    setUserData({
                        user_id: 0,
                        rol_id: 0,
                        nombre: ''
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
                {navList.map((item) => (
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
