import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import {
    Box,
    Button,
    Typography,
    Toolbar,
    FormControl,
    InputLabel,
    OutlinedInput,
    Select,
    MenuItem,
    Grid2 as Grid
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';

import { categoriaUpdateSchema } from '../../schemas';
import {
    actualizarCategoria,
    obtenerCategoriaById,
    obtenerEstados
} from '../../services';
import { HelperError, SkeletonGrid } from '../../components';
import { ICategorias, IEstado } from '../../interfaces';

export const ActualizarCategoriaPage = () => {
    const { categoria_producto_id = '0' } = useParams();
    const push = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [estados, setEstados] = useState<IEstado[]>([]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(categoriaUpdateSchema)
    });

    const getData = async () => {
        setFetching(true);
        try {
            const [estadosRes, categoriaRes] = await Promise.all([
                obtenerEstados(),
                obtenerCategoriaById(categoria_producto_id)
            ]);

            if (estadosRes.success && categoriaRes) {
                setEstados(estadosRes.data);

                const { nombre, estado_id } = categoriaRes.data as ICategorias;
                setValue('nueva_categoria', nombre);
                setValue('estado_id', estado_id);
            } else {
                console.error(estadosRes.message, categoriaRes.message);
                enqueueSnackbar(
                    'Error al obtener la información de las categorias',
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
            const res = await actualizarCategoria(categoria_producto_id, data);
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                push('/categorias');
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
                    Actualizar Categoría
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBack style={{ color: '#000' }} />}
                    onClick={() => push('/categorias')}
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
                                <InputLabel htmlFor="outlined-adornment-email">
                                    {'Nombre de la categoría *'}
                                </InputLabel>
                                <Controller
                                    name="nueva_categoria"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <OutlinedInput
                                            autoFocus
                                            type="text"
                                            label="Nombre de la categoría *"
                                            name="nueva_categoria"
                                            value={value ?? ''}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            fullWidth
                                        />
                                    )}
                                />
                                <HelperError
                                    message={
                                        'Por favor ingrese una categoría valida.'
                                    }
                                    error={!!errors.nueva_categoria}
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
                                    message={
                                        'Por favor ingrese un estado valido.'
                                    }
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
                                Actualizar Categoria
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Box>
    );
};
