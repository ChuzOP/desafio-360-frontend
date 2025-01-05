import { useEffect, useState } from 'react';

import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
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
    InputAdornment,
    IconButton,
    Collapse
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { usuarioCreateSchema } from '../../schemas';
import { crearUsuario } from '../../services';
import { HelperError } from '../../components';
import { rolesList } from '../../utils';

export const CrearUsuarioPage = () => {
    const push = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<any>({
        resolver: yupResolver(usuarioCreateSchema)
    });

    const rolValue = watch('rol_id');

    useEffect(() => {
        setIsClient(rolValue === 2);
    }, [rolValue]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await crearUsuario(data);
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
                    Crear Usuario
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="nombre">Nombre *</InputLabel>
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
                            <InputLabel htmlFor="outlined-adornment-password">
                                {'Password *'}
                            </InputLabel>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({
                                    field: { value, onChange, onBlur }
                                }) => (
                                    <OutlinedInput
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        label="Password *"
                                        name="password"
                                        value={value ?? ''}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                )}
                            />
                            <HelperError
                                message={
                                    'Por favor ingrese una contraseña valida.'
                                }
                                error={!!errors.password}
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

                    <Collapse
                        in={isClient}
                        timeout="auto"
                        unmountOnExit
                        sx={{ width: '100%' }}
                    >
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
                        </Grid>
                    </Collapse>

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
                            Crear Usuario
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
