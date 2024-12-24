import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router';

import { BackGroundPattern } from '../components';

export const AuthLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <BackGroundPattern />
            <Paper
                sx={{
                    padding: 5,
                    width: '100%',
                    maxWidth: 450,
                    borderRadius: 0.5,
                    zIndex: 1,
                    backgroundColor: 'common.white',
                    boxShadow: 15
                }}
            >
                <Outlet />
            </Paper>
        </Box>
    );
};
