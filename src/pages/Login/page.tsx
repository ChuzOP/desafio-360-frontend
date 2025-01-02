import { useContext, useState } from 'react';
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    Link as MuiLink,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { loginSchema } from '../../schemas';
import { HelperError } from '../../components';
import { loginService } from '../../services';
import { AuthContext } from '../../context';

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const { setIsAuthenticated } = useContext(AuthContext);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(loginSchema)
    });

    const push = useNavigate();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await loginService(data);
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                setIsAuthenticated(true);
                push('/productos');
            } else {
                enqueueSnackbar('Credenciales Invalidas', {
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}
                marginBottom={2}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    color="#000"
                    fontStyle={{ fontWeight: '600' }}
                >
                    Login
                </Typography>
                <MuiLink
                    component={Link}
                    to="/register"
                    underline="hover"
                    color="info"
                >
                    ¿No tienes Cuenta?
                </MuiLink>
            </Box>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}
            >
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-email">
                        {'Correo Electrónico *'}
                    </InputLabel>
                    <Controller
                        name="correo_electronico"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <OutlinedInput
                                autoFocus
                                type="email"
                                label="Correo Electrónico *"
                                name="correo_electronico"
                                value={value ?? ''}
                                onBlur={onBlur}
                                onChange={onChange}
                                fullWidth
                            />
                        )}
                    />
                    <HelperError
                        message={
                            'Por favor ingrese un correo electrónico valido.'
                        }
                        error={!!errors.correo_electronico}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                        {'Password *'}
                    </InputLabel>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
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
                                                setShowPassword(!showPassword)
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
                        message={'Por favor ingrese una contraseña valida.'}
                        error={!!errors.password}
                    />
                </FormControl>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Login
                </LoadingButton>
            </form>
        </Box>
    );
};
