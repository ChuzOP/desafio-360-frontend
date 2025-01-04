import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';

export const NotAllowedPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(-1);
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
                No tienes los permisos necesarios para ingresar a esta página.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoHome}
                sx={{ textTransform: 'none', paddingX: 4 }}
                startIcon={<ArrowBack sx={{ color: '#fff' }} />}
            >
                Regresar
            </Button>
        </Container>
    );
};