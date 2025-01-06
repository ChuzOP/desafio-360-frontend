import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack, FolderOpen } from '@mui/icons-material';
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
    Grid2 as Grid,
    Paper
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';

import { productoUpdateSchema } from '../../schemas';
import {
    actualizarProducto,
    obtenerCategorias,
    obtenerEstados,
    obtenerProductoById
} from '../../services';
import { HelperError, NoImage, SkeletonGrid } from '../../components';
import { ICategorias, IEstado } from '../../interfaces';
import { bufferConverter, getImage } from '../../utils';

export const ActualizarProductoPage = () => {
    const { producto_id = '0' } = useParams();
    const push = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [estados, setEstados] = useState<IEstado[]>([]);
    const [categorias, setCategorias] = useState<ICategorias[]>([]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm<any>({
        resolver: yupResolver(productoUpdateSchema)
    });

    const getData = async () => {
        setFetching(true);
        try {
            const [estadosRes, categoriasRes, productoRes] = await Promise.all([
                obtenerEstados(),
                obtenerCategorias(),
                obtenerProductoById(producto_id)
            ]);

            if (estadosRes.success && categoriasRes.success) {
                setEstados(estadosRes.data);
                setCategorias(categoriasRes.data);

                if (productoRes.success) {
                    setValue('producto_id', productoRes.data.producto_id);
                    setValue('nombre', productoRes.data.nombre);
                    setValue('marca', productoRes.data.marca);
                    setValue('codigo', productoRes.data.codigo);
                    setValue('stock', productoRes.data.stock);
                    setValue('precio', productoRes.data.precio);
                    setValue('estado_id', productoRes.data.estado_id);
                    setValue('categoria_producto_id', productoRes.data.categoria_producto_id);
                    if (productoRes.data.imagen) {
                        const imageFile = await bufferConverter(productoRes.data.imagen, `producto-${productoRes.data.producto_id}`);
                        setValue('imagen', imageFile);
                    }
                } else {
                    console.error(productoRes.message);
                    enqueueSnackbar(
                        'Error al obtener la información del producto',
                        {
                            variant: 'error'
                        }
                    );
                }
            } else {
                console.error(
                    estadosRes.message,
                    categoriasRes.message,
                    productoRes.message
                );
                enqueueSnackbar(
                    'Error al obtener la información de las categorias y/o los estados',
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
            const res = await actualizarProducto(producto_id, data);
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
                    Actualizar Producto
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
                                Actualizar Producto
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Box>
    );
};
