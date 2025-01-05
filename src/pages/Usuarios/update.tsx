import { useEffect, useState } from 'react';

import { ArrowBack } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    Toolbar,
    FormControl,
    InputLabel,
    OutlinedInput,
    Grid2 as Grid,
    Select,
    MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';

import { usuarioUpdateSchema } from '../../schemas';
import {
    obtenerEstados,
    obtenerUsuarioById,
    updateUsuario
} from '../../services';
import { HelperError, SkeletonGrid } from '../../components';
import { rolesList } from '../../utils';
import { IEstado } from '../../interfaces';

export const UpdateUsuarioPage = () => {
    const { usuario_id = '0' } = useParams();
    const push = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    const [isClient, setIsClient] = useState(false);

    const [estados, setEstados] = useState<IEstado[]>([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<any>({
        resolver: yupResolver(usuarioUpdateSchema)
    });

    const getData = async () => {
        setFetching(true);
        try {
            const [estadosRes, usuarioRes] = await Promise.all([
                obtenerEstados(),
                obtenerUsuarioById(usuario_id)
            ]);

            if (estadosRes.success && usuarioRes.success) {
                setEstados(estadosRes.data);

                if (usuarioRes.success) {
                    setValue('usuario_id', usuarioRes.data.usuario_id);
                    setValue('nombre', usuarioRes.data.nombre);
                    setValue('correo_electronico', usuarioRes.data.correo_electronico);
                    setValue('rol_id', usuarioRes.data.rol_id);
                    setValue('estado_id', usuarioRes.data.estado_id);
                } else {
                    console.error(usuarioRes.message);
                    enqueueSnackbar(
                        'Error al obtener la información del usuario',
                        {
                            variant: 'error'
                        }
                    );
                }
            } else {
                console.error(estadosRes.message, usuarioRes.message);
                enqueueSnackbar(
                    'Error al obtener la información de los estados y/o el usuario',
                    {
                        variant: 'error'
                    }
                );
            }
        } catch (error) {
            console.error('Error general:', error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await updateUsuario(usuario_id, data);
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                push('/usuarios');
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
                    Actualizar Usuario
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBack style={{ color: '#000' }} />}
                    onClick={() => push('/usuarios')}
                >
                    Regresar
                </Button>
            </Box>
            <Toolbar />
            {fetching ? (
                <SkeletonGrid />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="nombre">
                                    Nombre *
                                </InputLabel>
                                <Controller
                                    name="nombre"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <OutlinedInput
                                            type="text"
                                            label="Nombre *"
                                            name="nombre"
                                            value={value ?? ''}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                <HelperError
                                    message="Por favor ingrese un nombre válido."
                                    error={!!errors.nombre}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="correo_electronico">
                                    Correo Electrónico *
                                </InputLabel>
                                <Controller
                                    name="correo_electronico"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <OutlinedInput
                                            type="email"
                                            name="correo_electronico"
                                            label="Correo Electrónico *"
                                            value={value ?? ''}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                <HelperError
                                    message="Por favor ingrese un Correo Electrónico válido."
                                    error={!!errors.correo_electronico}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>{'Rol *'}</InputLabel>
                                <Controller
                                    name="rol_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <Select
                                            name="rol_id"
                                            value={value ?? 0}
                                            label="Rol *"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled
                                        >
                                            <MenuItem value={0}>
                                                Selecciona
                                            </MenuItem>
                                            {rolesList.map((rol) => (
                                                <MenuItem
                                                    value={rol.rol_id}
                                                    key={rol.rol_id}
                                                >
                                                    {rol.rol}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <HelperError
                                    message={'Por favor ingrese un Rol valido.'}
                                    error={!!errors.rol_id}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>{'Estado *'}</InputLabel>
                                <Controller
                                    name="estado_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <Select
                                            name="estado_id"
                                            value={value ?? 0}
                                            label="Estado *"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        >
                                            <MenuItem value={0}>
                                                Selecciona
                                            </MenuItem>
                                            {estados.map((estado) => (
                                                <MenuItem
                                                    value={estado.estado_id}
                                                    key={estado.estado_id}
                                                >
                                                    {estado.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <HelperError
                                    message="Por favor ingrese un estado válido."
                                    error={!!errors.estado_id}
                                />
                            </FormControl>
                        </Grid>

                        <Grid
                            size={12}
                            sx={{
                                textAlign: 'end'
                            }}
                        >
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                sx={{
                                    maxWidth: '240px',
                                    marginLeft: 'auto'
                                }}
                            >
                                Actualizar Usuario
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Box>
    );
};
