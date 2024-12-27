import { SideNav } from '../components';
import { Toolbar, Box, Typography, Fab } from '@mui/material';
import { Outlet } from 'react-router';
import { LogoCustom } from '../components';
import { ShoppingCart } from '@mui/icons-material';

export const AppLayout = () => {
    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box
                sx={{
                    width: drawerWidth,
                    backgroundColor: 'grey.900',
                    maxheight: '100vh'
                }}
            >
                <Toolbar />
                <LogoCustom />
                <Toolbar />
                <SideNav />
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    paddingX: 5,
                    position: 'relative'
                }}
            >
                <Toolbar />
                <Box mt={1.5}>
                    <Outlet />
                </Box>
                <Fab
                    color="secondary"
                    aria-label="shopping-cart"
                    sx={{ position: 'fixed', bottom: "7%", right: "4%" }}
                >
                    <ShoppingCart style={{ color: '#000c' }} />
                </Fab>
            </Box>
        </Box>
    );
};
