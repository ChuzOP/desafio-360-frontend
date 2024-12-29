import { Box, List, Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { navList } from '../../utils';
import { NavItem } from './NavItem';
import {
    Logout,
    LogoutOutlined,
    Person,
    PersonOutline
} from '@mui/icons-material';
import { logoutService } from '../../services';
import { useSnackbar } from 'notistack';

export const SideNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const handleLogOut = async () => {
        try {
            const res = await logoutService();
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
            } else {
                enqueueSnackbar(res.message, {
                    variant: 'error'
                });
            }
            navigate('/login');
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
                    text="Profile"
                    icon={<PersonOutline />}
                    iconFulled={<Person />}
                    href="/"
                    isActive={false}
                />
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
