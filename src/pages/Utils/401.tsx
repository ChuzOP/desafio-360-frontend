import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/login');
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
            }}
        >
            <Box sx={{ maxWidth: 500, marginBottom: 3 }}>
                <img
                    src="/images/lost.svg"
                    alt="Acceso denegado"
                    style={{
                        maxWidth: '100%',
                        height: 'auto'
                    }}
                />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Acceso denegado
            </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
                sx={{ marginBottom: 3 }}
            >
                Necesitas estar autenticado para ingresar a esta página.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoHome}
                sx={{ textTransform: 'none', paddingX: 4 }}
            >
                Volver al login
            </Button>
        </Container>
    );
};
