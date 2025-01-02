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
            ? { label: 'Stock bajo', color: 'warning' }
            : null;

    const handleAddProduct = () => {
        addProduct({
            producto_id: `${producto_id}`,
            nombre,
            cantidad: 1,
            precio,
            imagen
        });
    };

    return (
        <Card
            sx={{
                width: 370,
                height: 370,
                maxWidth: 370,
                maxHeight: 370,
                margin: 'auto',
                borderRadius: 2,
                ':hover': { boxShadow: 3 },
                position: 'relative'
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
                        top: '3%',
                        left: '3%',
                        width: 'auto'
                    }}
                />
            )}
            <CardMedia
                component="img"
                height="70%"
                width={370}
                image={getImage(imagen)}
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
                        onClick={handleAddProduct}
                    >
                        {stock === 0 ? 'Sin stock' : 'Agregar al Carrito'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};
