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

export const SideNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogOut = () => {
        console.log('logout');
        navigate('/login');
    };

    return (
        <Box>
            <List>
                {navList.map((item) => (
                    <NavItem
                        key={item.href}
                        {...item}
                        isActive={location.pathname === item.href}
                    />
                ))}
            </List>
            <Toolbar />
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
