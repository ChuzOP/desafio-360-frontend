import { SideNav } from '../components';
import { Toolbar, Box, Typography, Fab, Drawer, Badge } from '@mui/material';
import { Outlet } from 'react-router';
import { LogoCustom } from '../components';
import { ShoppingCart } from '@mui/icons-material';
import { useContext } from 'react';
import { AppContext } from '../context';
import { CartDrawer } from '../components';

export const AppLayout = () => {
    const drawerWidth = 240;
    const { setCartDrawer, productos } = useContext(AppContext);

    return (
        <Box sx={{ display: 'flex', height: '100vh', maxHeight: '100vh' }}>
            <Box
                sx={{
                    width: drawerWidth,
                    backgroundColor: 'grey.900'
                }}
            >
                <LogoCustom />
                <SideNav />
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    paddingX: 5,
                    position: 'relative',
                    overflow: 'auto'
                }}
            >
                <Toolbar />
                <Box mt={1.5}>
                    <Outlet />
                </Box>
                <CartDrawer />
                <Fab
                    color="secondary"
                    aria-label="shopping-cart"
                    onClick={() => setCartDrawer(true)}
                    sx={{ position: 'fixed', bottom: '4%', right: '4%' }}
                >
                    <Badge color="primary" badgeContent={productos.length} max={999}>
                        <ShoppingCart style={{ color: '#000c', margin: 6 }} />
                    </Badge>
                </Fab>
            </Box>
        </Box>
    );
};
