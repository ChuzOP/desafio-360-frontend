import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/productos');
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
            }}
        >
            <Box sx={{ maxWidth: 500, marginBottom: 3 }}>
                <img
                    src="/images/not_found.svg"
                    alt="Página no encontrada"
                    style={{
                        maxWidth: '100%',
                        height: 'auto'
                    }}
                />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
                ¡Oops! Página no encontrada
            </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
                sx={{ marginBottom: 3 }}
            >
                Lo sentimos, no pudimos encontrar la página que buscabas.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoHome}
                sx={{ textTransform: 'none', paddingX: 4 }}
            >
                Ir al inicio
            </Button>
        </Container>
    );
};