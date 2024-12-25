import { SideNav } from '../components';
import { Toolbar, Box, Typography } from '@mui/material';
import { Outlet } from 'react-router';

export const AppLayout = () => {
    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex', position: 'relative' }}>
            <Box
                sx={{
                    width: drawerWidth,
                    backgroundColor: 'grey.900',
                    height: '100vh'
                }}
            >
                <Toolbar />
                <SideNav />
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};
