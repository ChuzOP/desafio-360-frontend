import { useEffect, useState } from 'react';

import { Add, Edit } from '@mui/icons-material';
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
    Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router';

import { obtenerCategorias } from '../../services';
import { SkeletonTable } from '../../components';
import { ICategorias } from '../../interfaces';

export const CategoriasPage = () => {
    const push = useNavigate();

    const [categorias, setCategorias] = useState<ICategorias[]>([]);
    const [fetching, setFetching] = useState(true);

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
                                                onClick={() => updateCategoria(categoria)}
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
