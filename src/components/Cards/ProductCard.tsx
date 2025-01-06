import React, { useContext } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Chip,
    Box
} from '@mui/material';
import { Category } from '@mui/icons-material';
import { IGetProducto } from '../../interfaces';
import { AppContext } from '../../context';
import { getImage } from '../../utils';

export const ProductCard: React.FC<IGetProducto> = ({
    producto_id,
    nombre_categoria,
    nombre_estado,
    nombre,
    marca,
    stock,
    precio,
    imagen
}) => {
    const { addProduct } = useContext(AppContext);

    const stockBadge: {
        label: string;
        color:
            | 'error'
            | 'warning'
            | 'default'
            | 'secondary'
            | 'primary'
            | 'info'
            | 'success';
    } | null =
        stock === 0
            ? { label: 'Sin stock', color: 'error' }
            : stock < 3
            ? { label: 'Pocas unidades', color: 'warning' }
            : null;

    const handleAddProduct = () => {
        addProduct({
            producto_id: `${producto_id}`,
            nombre,
            cantidad: 1,
            precio,
            imagen,
            stock
        });
    };

    return (
        <Box
            sx={{
                width: 250,
                height: 380,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 4
                }
            }}
        >
            <Chip
                icon={<Category />}
                label={nombre_categoria}
                color="secondary"
                size="small"
                sx={{
                    position: 'absolute',
                    top: '3%',
                    right: '3%',
                    width: 'auto'
                }}
            />
            {stockBadge && (
                <Chip
                    label={stockBadge.label}
                    color={stockBadge.color}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: '56%',
                        left: '3%',
                        width: 'auto'
                    }}
                />
            )}
            <CardMedia
                component="img"
                height="65%"
                width="100%"
                image={getImage(imagen)}
                alt={`Imagen de ${nombre}`}
                sx={{
                    objectFit: 'cover'
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 1,
                    height: '35%'
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {nombre}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontStyle: 'italic',
                        fontSize: '0.9rem'
                    }}
                >
                    {marca}
                </Typography>
                <Typography
                    variant="h5"
                    fontWeight={'bold'}
                    color="textPrimary"
                >
                    Q.{precio.toFixed(2)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={stock === 0}
                        onClick={handleAddProduct}
                        size="small"
                    >
                        {stock === 0 ? 'Sin stock' : 'Agregar al Carrito'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
