import { useContext, useEffect, useState } from 'react';
import {
    Add,
    ArrowBack,
    Remove,
    Close as CloseIcon
} from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    Toolbar,
    Paper,
    Grid2 as Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppContext, AuthContext } from '../../context';
import { crearOrden, obtenerClienteByUsuarioId } from '../../services';
import { shippingAddressSchema } from '../../schemas';
import { HelperError, SkeletonGrid } from '../../components';
import { getImage } from '../../utils';
import { addDays, format } from 'date-fns';

export const CheckoutPage = () => {
    const push = useNavigate();
    const { userData } = useContext(AuthContext);
    const { productos, deleteProduct, updateQuantity, clearCart } = useContext(AppContext);

    const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<any>({
        resolver: yupResolver(shippingAddressSchema)
    });

    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);

    const fillData = async () => {
        setFetching(true);
        try {
            const clienteRes = await obtenerClienteByUsuarioId(
                userData.user_id
            );

            if (clienteRes.success) {
                setValue('direccion', clienteRes.data.direccion || '');
                setValue('telefono', clienteRes.data.telefono || '');
                setValue(
                    'correo_electronico',
                    clienteRes.data.correo_electronico || ''
                );
                setValue('cliente_id', clienteRes.data.cliente_id || '');
                setValue('orden_detalle', productos);
                setValue('fecha_entrega', tomorrow);
            } else {
                console.error(clienteRes.message);
                enqueueSnackbar('Error al obtener la información del cliente', {
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
        fillData();
    }, []);

    useEffect(() => {
        setValue('orden_detalle', productos);
    }, [productos]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await crearOrden(data);
            if (res.success) {
                clearCart();
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                push('/catalogo');
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
                    Checkout
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
            <Paper sx={{ display: 'flex', p: 4, gap: 2 }}>
                <Box
                    sx={{
                        width: '30%',
                        backgroundColor: 'background.default',
                        borderRadius: 3
                    }}
                >
                    <Typography variant="h5" fontWeight={600} mt={2} ml={2}>
                        Tu Orden
                    </Typography>
                    {productos.map((product) => (
                        <Box
                            key={product.producto_id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 2
                            }}
                        >
                            <div
                                style={{
                                    width: 70,
                                    height: 70,
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: 8,
                                    padding: 1
                                }}
                            >
                                <img
                                    src={getImage(product.imagen)}
                                    alt={product.nombre}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignContent: 'center',
                                    flexGrow: 1,
                                    paddingX: 2
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {product.nombre}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Typography variant="body2">
                                        Q.{product.precio * product.cantidad}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="rgb(125, 135, 156)"
                                        fontStyle={'italic'}
                                    >
                                        Q.{product.precio} c/u
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: 1
                                    }}
                                >
                                    <IconButton
                                        onClick={() =>
                                            updateQuantity(
                                                product.producto_id,
                                                -1
                                            )
                                        }
                                        disabled={product.cantidad === 1}
                                        size="small"
                                        sx={{
                                            border: '1px solid #5742e9',
                                            borderRadius: 1,
                                            padding: 0
                                        }}
                                    >
                                        <Remove style={{ color: '#5742e9' }} />
                                    </IconButton>
                                    <span style={{ padding: '0px 15px' }}>
                                        {product.cantidad}
                                    </span>
                                    <IconButton
                                        onClick={() =>
                                            updateQuantity(
                                                product.producto_id,
                                                1
                                            )
                                        }
                                        size="small"
                                        sx={{
                                            border: '1px solid #5742e9',
                                            borderRadius: 1,
                                            padding: 0
                                        }}
                                    >
                                        <Add style={{ color: '#5742e9' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <IconButton
                                onClick={() =>
                                    deleteProduct(`${product.producto_id}`)
                                }
                            >
                                <CloseIcon style={{ color: '#e02828' }} />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box sx={{ width: '70%' }}>
                    <Typography variant="h5" fontWeight={600} my={2}>
                        Datos de Envío
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {fetching ? (
                            <SkeletonGrid />
                        ) : (
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel htmlFor="direccion">
                                            Dirección *
                                        </InputLabel>
                                        <Controller
                                            name="direccion"
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
                                                    label="Dirección *"
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                        <HelperError
                                            message="Por favor ingrese una dirección válida."
                                            error={!!errors.direccion}
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
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
                                            }) => (
                                                <OutlinedInput
                                                    type="number"
                                                    label="Télefono *"
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                        <HelperError
                                            message="Por favor ingrese un télefono válido."
                                            error={!!errors.telefono}
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
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur
                                                }
                                            }) => (
                                                <OutlinedInput
                                                    type="text"
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
                                        <InputLabel
                                            htmlFor="fecha_entrega"
                                            shrink
                                        >
                                            Fecha de Entrega *
                                        </InputLabel>
                                        <Controller
                                            name="fecha_entrega"
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
                                                    type="date"
                                                    label="Fecha de Entrega *"
                                                    notched
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    inputProps={{
                                                        min: tomorrow
                                                    }}
                                                />
                                            )}
                                        />
                                        <HelperError
                                            message="Por favor ingrese una fecha valida."
                                            error={!!errors.fecha_entrega}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )}
                        <Box sx={{ mt: 2, width: '100%' }}>
                            <HelperError
                                message="Debe agregar al menos un producto para realizar la orden."
                                error={!!errors.orden_detalle}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 4
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Confirmar Orden
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};
