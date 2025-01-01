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

import { ProductCard } from '../../components';

const productList = [
    {
        producto_id: 4,
        categoria_producto_id: 103,
        categoria_nombre: 'Deportes',
        estado_id: 1,
        estado_nombre: 'Disponible',
        nombre: 'Bicicleta de montaña Trek Marlin 7',
        marca: 'Trek',
        codigo: 'TM7-2023',
        stock: 0,
        precio: 999.99,
        imagen: ''
    }
];

const categorias = ['Arte', 'Tal'];

export const CatalogoPage = () => {
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
                >
                    Agregar producto
                </Button>
            </Box>
            <Toolbar />
            <Paper sx={{ display: 'flex', p: 4 }}>
                <Box sx={{ width: 200, mr: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }} textAlign="center">
                        Categorías
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List>
                        {categorias.map((categoria, index) => (
                            <ListItem key={index}>
                                <ListItemButton>{categoria}</ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ p: 4 }}>
                    <Grid container spacing={10}>
                        {productList.map((product) => (
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
            </Paper>
        </Box>
    );
};
