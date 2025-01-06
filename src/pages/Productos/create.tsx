import { useEffect, useState } from 'react';

import { ArrowBack, FolderOpen } from '@mui/icons-material';
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
    Paper
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { productoCreateSchema } from '../../schemas';
import {
    crearProducto,
    obtenerCategorias,
    obtenerEstados
} from '../../services';
import { HelperError, NoImage, SkeletonGrid } from '../../components';
import { ICategorias, IEstado } from '../../interfaces';
import { getImage } from '../../utils';

export const CrearProductoPage = () => {
    const push = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [estados, setEstados] = useState<IEstado[]>([]);
    const [categorias, setCategorias] = useState<ICategorias[]>([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<any>({
        resolver: yupResolver(productoCreateSchema)
    });

    const getData = async () => {
        setFetching(true);
        try {
            const [estadosRes, categoriaRes] = await Promise.all([
                obtenerEstados(),
                obtenerCategorias()
            ]);

            if (estadosRes.success && categoriaRes.success) {
                setEstados(estadosRes.data);
                setCategorias(categoriaRes.data);
            } else {
                console.error(estadosRes.message, categoriaRes.message);
                enqueueSnackbar('Error al obtener la información', {
                    variant: 'error'
                });
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
            const res = await crearProducto(data);
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                push('/productos');
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

    const uploadImage = async (file: File | null) => {
        if (!file) {
            enqueueSnackbar('No se seleccionó ningún archivo.', {
                variant: 'warning'
            });
            return;
        }

        try {
            setValue('imagen', file);
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
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
                    Crear Producto
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBack style={{ color: '#000' }} />}
                    onClick={() => push('/productos')}
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
                        <Grid
                            size={{
                                xs: 12,
                                md: 8
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                >
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel htmlFor="nombre">
                                            Nombre *
                                        </InputLabel>
                                        <Controller
                                            name="nombre"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
                                            }) => (
                                                <OutlinedInput
                                                    type="text"
                                                    label="Nombre *"
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

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                >
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel htmlFor="marca">
                                            Marca
                                        </InputLabel>
                                        <Controller
                                            name="marca"
                                            control={control}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
                                            }) => (
                                                <OutlinedInput
                                                    type="text"
                                                    label="Marca"
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                >
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel htmlFor="codigo">
                                            Código
                                        </InputLabel>
                                        <Controller
                                            name="codigo"
                                            control={control}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
                                            }) => (
                                                <OutlinedInput
                                                    type="text"
                                                    label="Código"
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                >
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel htmlFor="stock">
                                            Stock
                                        </InputLabel>
                                        <Controller
                                            name="stock"
                                            control={control}
                                            defaultValue={0}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
                                            }) => (
                                                <OutlinedInput
                                                    type="number"
                                                    label="Stock"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                >
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel htmlFor="precio">
                                            Precio *
                                        </InputLabel>
                                        <Controller
                                            name="precio"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
                                            }) => (
                                                <OutlinedInput
                                                    type="number"
                                                    label="Precio *"
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                        <HelperError
                                            message="Por favor ingrese un precio válido."
                                            error={!!errors.precio}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                >
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel>{'Estado *'}</InputLabel>
                                        <Controller
                                            name="estado_id"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
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
                                                            value={
                                                                estado.estado_id
                                                            }
                                                            key={
                                                                estado.estado_id
                                                            }
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
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                >
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel>{'Categoría *'}</InputLabel>
                                        <Controller
                                            name="categoria_producto_id"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
                                            }) => (
                                                <Select
                                                    name="categoria_producto_id"
                                                    value={value ?? 0}
                                                    label="Categoría *"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                >
                                                    <MenuItem value={0}>
                                                        Selecciona
                                                    </MenuItem>
                                                    {categorias.map(
                                                        (categoria) => (
                                                            <MenuItem
                                                                value={
                                                                    categoria.categoria_producto_id
                                                                }
                                                                key={
                                                                    categoria.categoria_producto_id
                                                                }
                                                            >
                                                                {
                                                                    categoria.nombre
                                                                }
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            )}
                                        />
                                        <HelperError
                                            message="Por favor ingrese una categoría válida."
                                            error={
                                                !!errors.categoria_producto_id
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <FormControl variant="outlined" fullWidth>
                                        <Controller
                                            name="imagen"
                                            control={control}
                                            render={({
                                                field: { onChange }
                                            }) => (
                                                <Button
                                                    variant="outlined"
                                                    component="label"
                                                    startIcon={
                                                        <FolderOpen
                                                            style={{
                                                                color: '#000'
                                                            }}
                                                        />
                                                    }
                                                >
                                                    Cargar Imagen
                                                    <input
                                                        name="imagen"
                                                        type="file"
                                                        hidden
                                                        accept="image/*"
                                                        onChange={async (e) =>
                                                            uploadImage(
                                                                e.target
                                                                    .files?.[0] ||
                                                                    null
                                                            )
                                                        }
                                                    />
                                                </Button>
                                            )}
                                        />
                                        <HelperError
                                            message="Por favor ingrese una imagen válida."
                                            error={!!errors.imagen}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4
                            }}
                        >
                            <Paper
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {watch('imagen') ? (
                                    <img
                                        src={getImage(watch('imagen'))}
                                        alt="Vista previa"
                                        style={{
                                            width: '100%',
                                            maxWidth: '270px',
                                            maxHeight: '270px'
                                        }}
                                    />
                                ) : (
                                    <NoImage />
                                )}
                            </Paper>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12
                            }}
                            sx={{ textAlign: 'end' }}
                        >
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                sx={{ maxWidth: '240px', marginLeft: 'auto' }}
                            >
                                Crear Producto
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Box>
    );
};
