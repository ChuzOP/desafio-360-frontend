import { useEffect, useState } from 'react';

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
    Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router';

import { inactivateCliente, obtenerClientes } from '../../services';
import { ConfirmModal, SkeletonTable } from '../../components';
import { ICliente } from '../../interfaces';
import { enqueueSnackbar } from 'notistack';

export const ClientesPage = () => {
    const push = useNavigate();

    const [fetching, setFetching] = useState(true);
    const [clientes, setClientes] = useState<ICliente[]>([]);

    const [confirmInactivate, setConfirmInactivate] = useState(false);
    const [cliente_id, setCliente_id] = useState(0);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setFetching(true);
        try {
            const res = await obtenerClientes();
            if (res.success) {
                setClientes(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setFetching(false);
        }
    };

    const updateCliente = (cliente: ICliente) => {
        push(`/clientes/actualizar/${cliente.cliente_id}`);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDeactiveCategory = async () => {
        setLoading(true);
        try {
            const res = await inactivateCliente(cliente_id);
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                getData();
                setConfirmInactivate(false);
                setCliente_id(0);
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
                    Clientes
                </Typography>
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
                                <TableCell>Nombre Completo</TableCell>
                                <TableCell>Télefono</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.map((cliente) => (
                                <TableRow key={cliente.cliente_id}>
                                    <TableCell>{cliente.cliente_id}</TableCell>
                                    <TableCell>
                                        {cliente.nombre_completo}
                                    </TableCell>
                                    <TableCell>{cliente.telefono}</TableCell>
                                    <TableCell>{cliente.direccion}</TableCell>
                                    <TableCell>
                                        {cliente.estado_nombre}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Editar" arrow>
                                            <IconButton
                                                onClick={() =>
                                                    updateCliente(cliente)
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
                                                    setCliente_id(cliente.cliente_id);
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
                title={'Inactivar Cliente'}
                description={
                    'Al inactivar este cliente, Su usuario asociado también será inactivado. ¿Desea continuar?'
                }
                loading={loading}
            />
        </Box>
    );
};
