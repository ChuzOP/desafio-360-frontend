import { SideNav } from '../components';
import { Toolbar, Box, Typography } from '@mui/material';
import { Outlet } from 'react-router';
import { LogoCustom } from '../components';

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
                    paddingX: 5
                }}
            >
                <Toolbar />
                <Box mt={1.5}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};
