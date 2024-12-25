import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router';

interface Props {
    text: string;
    icon: JSX.Element;
    iconFulled: JSX.Element;
    href?: string;
    isActive?: boolean;
    handleClick?: () => void;
}

export const NavItem = ({
    isActive = false,
    href = '/',
    icon,
    iconFulled,
    text,
    handleClick
}: Props) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (handleClick) {
            handleClick();
        } else {
            navigate(href);
        }
    };

    return (
        <ListItem key={href}>
            <ListItemButton
                onClick={handleAction}
                sx={{
                    backgroundColor: isActive ? 'primary.main' : 'inherit',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: isActive ? 'primary.dark' : 'grey.800'
                    },
                    borderRadius: '6px'
                }}
            >
                <ListItemIcon
                    sx={{
                        '& svg': {
                            color: isActive ? 'white' : '#707070'
                        }
                    }}
                >
                    {isActive ? iconFulled : icon}
                </ListItemIcon>
                <ListItemText
                    sx={{}}
                    primary={text}
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
};
