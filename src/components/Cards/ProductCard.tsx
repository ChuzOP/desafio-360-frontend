import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid2 as Grid,
    Button,
    Link as MuiLink,
    Chip,
    Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { Category, ShoppingCart, Star } from '@mui/icons-material';

interface Props {
    producto_id: number;
    categoria_producto_id: number;
    categoria_nombre: string;
    estado_id: number;
    estado_nombre: string;
    nombre: string;
    marca?: string;
    codigo: string;
    stock: number;
    precio: number;
    imagen: string;
}

export const ProductCard: React.FC<Props> = ({
    producto_id,
    categoria_nombre,
    estado_nombre,
    nombre,
    marca,
    stock,
    precio,
    imagen
}) => {
    const navigate = useNavigate();

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
            ? { label: 'Stock bajo', color: 'warning' }
            : null;

    return (
        <Card
            sx={{
                width: 370,
                height: 370,
                margin: 'auto',
                borderRadius: 2,
                ':hover': { boxShadow: 3 },
                position: 'relative'
            }}
        >
            <Chip
                icon={<Category />}
                label={categoria_nombre}
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
                        top: '3%',
                        left: '3%',
                        width: 'auto'
                    }}
                />
            )}
            <CardMedia
                component="img"
                height="70%"
                image={imagen}
                alt={`Imagen de ${nombre}`}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    {nombre}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Typography variant="body1">
                            Q.{precio.toFixed(2)}
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
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={stock === 0}
                        onClick={() => {}}
                    >
                        {stock === 0 ? 'Sin stock' : 'Agregar al Carrito'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};
