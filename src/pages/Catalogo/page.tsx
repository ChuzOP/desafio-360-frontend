import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import {
    Box,
    Button,
    Typography,
    Toolbar,
    Paper,
    Grid2 as Grid,
    Divider,
    List,
    ListItem,
    ListItemButton
} from '@mui/material';
import { useNavigate } from 'react-router';

import { NoData, ProductCard, SkeletonCard } from '../../components';
import { obtenerProductos } from '../../services';
import { IGetProducto } from '../../interfaces';

const categorias = ['Arte', 'Tal'];

export const CatalogoPage = () => {
    const push = useNavigate();

    const [fetching, setFetching] = useState(true);
    const [productos, setProductos] = useState<IGetProducto[]>([]);

    const getData = async () => {
        setFetching(true);
        try {
            const res = await obtenerProductos();
            if (res.success) {
                setProductos(res.data);
            } else {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

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
            </Box>
            <Toolbar />
            <Paper sx={{ display: 'flex', p: 4 }}>
                {fetching ? (
                    <SkeletonCard />
                ) : productos.length === 0 ? (
                    <NoData dialog="No se encontraron Productos" />
                ) : (
                    <Box sx={{ p: 4, flexGrow: 1 }}>
                        <Grid container spacing={10}>
                            {productos.map((product) => (
                                <Grid
                                    size={{
                                        md: 12,
                                        lg: 6,
                                        xl: 4
                                    }}
                                    key={product.producto_id}
                                >
                                    <ProductCard {...product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};
