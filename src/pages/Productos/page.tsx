import { useEffect, useState } from 'react';

import { Add, Edit } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    Toolbar,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    TableBody
} from '@mui/material';
import { useNavigate } from 'react-router';

import { SkeletonCard, NoData, SkeletonTable } from '../../components';
import { IGetProducto } from '../../interfaces';
import { obtenerProductos } from '../../services';

export const ProductosPage = () => {
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

    const updateProducto = (producto: IGetProducto) => {
        push(`/productos/actualizar/${producto.producto_id}`);
    };

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
            <TableContainer component={Paper}>
                {fetching ? (
                    <SkeletonTable />
                ) : productos.length === 0 ? (
                    <NoData dialog="No se encontraron Productos" />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Categoria</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.map((producto) => (
                                <TableRow key={producto.producto_id}>
                                    <TableCell>{producto.codigo}</TableCell>
                                    <TableCell>{producto.nombre}</TableCell>
                                    <TableCell>
                                        {producto.nombre_estado}
                                    </TableCell>
                                    <TableCell>
                                        {producto.nombre_categoria}
                                    </TableCell>

                                    <TableCell>
                                        <Tooltip title="Editar" arrow>
                                            <IconButton
                                                onClick={() =>
                                                    updateProducto(producto)
                                                }
                                                sx={{
                                                    padding: 0
                                                }}
                                            >
                                                <Edit
                                                    style={{ color: '#6e88f2' }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    );
};
