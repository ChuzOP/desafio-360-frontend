import { useState } from 'react';

import { ArrowBack } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    Toolbar,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

import { categoriaSchema } from '../../schemas';
import { crearCategoria } from '../../services';
import { HelperError } from '../../components';
import { LoadingButton } from '@mui/lab';

export const CrearCategoriaPage = () => {
    const push = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(categoriaSchema)
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await crearCategoria(data);
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
                    Crear Categoría
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
                        {'Nombre de la categoría *'}
                    </InputLabel>
                    <Controller
                        name="categoria"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <OutlinedInput
                                autoFocus
                                type="text"
                                label="Nombre de la categoría *"
                                name="categoria"
                                value={value ?? ''}
                                onBlur={onBlur}
                                onChange={onChange}
                                fullWidth
                            />
                        )}
                    />
                    <HelperError
                        message={'Por favor ingrese una categoría valida.'}
                        error={!!errors.categoria}
                    />
                </FormControl>
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
                    Crear Categoria
                </LoadingButton>
            </form>
        </Box>
    );
};
