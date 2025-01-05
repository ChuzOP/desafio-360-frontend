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

import { obtenerUsuarios } from '../../services';
import { SkeletonTable } from '../../components';
import { IUsuario } from '../../interfaces';

export const UsuariosPage = () => {
    const push = useNavigate();

    const [fetching, setFetching] = useState(true);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

    const getData = async () => {
        setFetching(true);
        try {
            const res = await obtenerUsuarios();
            if (res.success) {
                setUsuarios(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setFetching(false);
        }
    };

    const updateUsuario = (usuario: IUsuario) => {
        push(`/usuarios/actualizar/${usuario.usuario_id}`);
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
                    Usuarios
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add style={{ color: '#fff' }} />}
                    onClick={() => push('/usuarios/crear')}
                >
                    Agregar Usuario
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
                                <TableCell>Correo Electrónico</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.map((usuario) => (
                                <TableRow key={usuario.usuario_id}>
                                    <TableCell>{usuario.usuario_id}</TableCell>
                                    <TableCell>{usuario.nombre}</TableCell>
                                    <TableCell>{usuario.correo_electronico}</TableCell>
                                    <TableCell>{usuario.rol}</TableCell>
                                    <TableCell>
                                        {usuario.estado_nombre}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Editar" arrow>
                                            <IconButton
                                                onClick={() =>
                                                    updateUsuario(usuario)
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
