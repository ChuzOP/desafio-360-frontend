import { useState } from 'react';

import { Add } from '@mui/icons-material';
import { Box, Typography, Button, Toolbar, Paper } from '@mui/material';
import { useNavigate } from 'react-router';

import { SkeletonCard, NoData } from '../../components';

export const ProductosPage = () => {
    const push = useNavigate();

    const [fetching, setFetching] = useState(false);

    const [productos, setProductos] = useState([]);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}
            >
                <Typography variant="h3" fontWeight={600}>
                    Catálogo de productos
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add style={{ color: '#fff' }} />}
                    onClick={() => push('/productos/crear')}
                >
                    Agregar producto
                </Button>
            </Box>
            <Toolbar />
            <Paper sx={{ display: 'flex', p: 4 }}>
                {fetching ? (
                    <SkeletonCard />
                ) : productos.length === 0 ? (
                    <NoData dialog="No se encontraron Productos" />
                ) : (
                    <Box sx={{ p: 4, flexGrow: 1 }}></Box>
                )}
            </Paper>
        </Box>
    );
};
