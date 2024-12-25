import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { navList } from '../../utils';

export const SideNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <List>
            {navList.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                    <ListItem key={item.href}>
                        <ListItemButton
                            onClick={() => navigate(item.href)}
                            sx={{
                                backgroundColor: isActive
                                    ? 'primary.main'
                                    : 'inherit',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: isActive
                                        ? 'primary.dark'
                                        : 'grey.800'
                                },
                                borderRadius: '6px',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    '& svg': {
                                        color: isActive ? 'white' : '#707070'
                                    }
                                }}
                            >
                                {isActive ? item.iconFulled : item.icon}
                            </ListItemIcon>
                            <ListItemText
                                sx={{}}
                                primary={item.text}
                                slotProps={{
                                    primary: {
                                        sx: {
                                            color: isActive ? 'white' : '#707070'
                                        }
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};
