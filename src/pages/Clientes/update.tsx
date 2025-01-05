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
    Grid2 as Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';

import { clienteUpdateSchema } from '../../schemas';
import { obtenerClienteById, updateCliente } from '../../services';
import { HelperError, SkeletonGrid } from '../../components';

export const UpdateClientePage = () => {
    const { cliente_id = '0' } = useParams();
    const push = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<any>({
        resolver: yupResolver(clienteUpdateSchema)
    });

    const getData = async () => {
        setFetching(true);
        try {
            const clienteRes = await obtenerClienteById(cliente_id);

            if (clienteRes.success) {
                setValue('cliente_id', clienteRes.data.cliente_id);
                setValue('nombre_completo', clienteRes.data.nombre_completo);
                setValue('direccion', clienteRes.data.direccion);
                setValue('telefono', clienteRes.data.telefono);
            } else {
                console.error(clienteRes.message);
                enqueueSnackbar(
                    'Error al obtener la información de el cliente',
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
            const res = await updateCliente(cliente_id, data);
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                push('/clientes');
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
                    Actualizar Cliente
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBack style={{ color: '#000' }} />}
                    onClick={() => push('/clientes')}
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
                                <InputLabel htmlFor="nombre_completo">
                                    Nombre Completo *
                                </InputLabel>
                                <Controller
                                    name="nombre_completo"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <OutlinedInput
                                            name="nombre_completo"
                                            type="text"
                                            label="Nombre Completo *"
                                            value={value ?? ''}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                <HelperError
                                    message="Por favor ingrese un Nombre Completo válido."
                                    error={!!errors.nombre_completo}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="telefono">
                                    Télefono *
                                </InputLabel>
                                <Controller
                                    name="telefono"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <OutlinedInput
                                            name="telefono"
                                            type="number"
                                            label="Télefono *"
                                            value={value ?? ''}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                <HelperError
                                    message="Por favor ingrese un Télefono válido."
                                    error={!!errors.telefono}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="direccion">
                                    Dirección Domiciliar *
                                </InputLabel>
                                <Controller
                                    name="direccion"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <OutlinedInput
                                            name="direccion"
                                            type="text"
                                            label="Dirección Domiciliar *"
                                            value={value ?? ''}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                <HelperError
                                    message="Por favor ingrese una Dirección Domiciliar válida."
                                    error={!!errors.direccion}
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
                                Actualizar Cliente
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Box>
    );
};
