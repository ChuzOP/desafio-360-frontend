import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: 400,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    Bienvenido
                </Typography>
                <Outlet />
            </Paper>
        </Box>
    );
};
