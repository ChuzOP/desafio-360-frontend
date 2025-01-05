import { SetStateAction, useEffect, useState } from 'react';

import { Add, Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Toolbar,
    IconButton,
    Tooltip,
    Modal
} from '@mui/material';
import { useNavigate } from 'react-router';

import { inactivateCategoria, obtenerCategorias } from '../../services';
import { SkeletonTable, ConfirmModal } from '../../components';
import { ICategorias } from '../../interfaces';
import { enqueueSnackbar } from 'notistack';

export const CategoriasPage = () => {
    const push = useNavigate();

    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const [fetching, setFetching] = useState(true);

    const [confirmInactivate, setConfirmInactivate] = useState(false);
    const [categoria_id, setCategoria_id] = useState(0);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setFetching(true);
        try {
            const res = await obtenerCategorias();
            if (res.success) {
                setCategorias(res.data);
            }
        } catch (error) {
        } finally {
            setFetching(false);
        }
    };

    const handleDeactiveCategory = async () => {
        setLoading(true);
        try {
            const res = await inactivateCategoria(categoria_id);
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                getData();
                setConfirmInactivate(false);
                setCategoria_id(0);
            } else {
                enqueueSnackbar(res.message, {
                    variant: 'error'
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateCategoria = (categoria: ICategorias) => {
        push(`/categorias/actualizar/${categoria.categoria_producto_id}`);
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
                    Categorías
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add style={{ color: '#fff' }} />}
                    onClick={() => push('/categorias/crear')}
                >
                    Agregar Categoría
                </Button>
            </Box>
            <Toolbar />
            <TableContainer component={Paper}>
                {fetching ? (
                    <SkeletonTable />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categorias.map((categoria) => (
                                <TableRow key={categoria.categoria_producto_id}>
                                    <TableCell>
                                        {categoria.categoria_producto_id}
                                    </TableCell>
                                    <TableCell>{categoria.nombre}</TableCell>
                                    <TableCell>
                                        {categoria.estado_nombre}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Editar" arrow>
                                            <IconButton
                                                onClick={() =>
                                                    updateCategoria(categoria)
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
                                    <TableCell>
                                        <Tooltip title="Inactivar" arrow>
                                            <IconButton
                                                onClick={() => {
                                                    setConfirmInactivate(true);
                                                    setCategoria_id(
                                                        categoria.categoria_producto_id
                                                    );
                                                }}
                                                sx={{
                                                    padding: 0
                                                }}
                                            >
                                                <Delete
                                                    style={{ color: 'red' }}
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
            <ConfirmModal
                open={confirmInactivate}
                setOpen={setConfirmInactivate}
                handleConfirm={handleDeactiveCategory}
                title={'Inactivar Categoria'}
                description={
                    'Al inactivar esta categoría, todos los productos asociados a ella también serán inactivados. ¿Desea continuar?'
                }
                loading={loading}
            />
        </Box>
    );
};
