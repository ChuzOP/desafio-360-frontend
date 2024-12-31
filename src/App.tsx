import React, { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { SnackbarProvider } from 'notistack';

import { Routes, Route } from 'react-router';
import {
    ActualizarCategoriaPage,
    CatalogoPage,
    CategoriasPage,
    CrearCategoriaPage,
    LoginPage,
    NotFoundPage,
    OrdenesPage,
    RegisterPage,
    UnauthorizedPage,
    UsuariosPage
} from './pages';
import { AppLayout, AuthLayout } from './layouts';

import { AppProvider, AuthProvider } from './context';
import RouteProtector from './utils/RouteProtector';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppProvider>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
                        <CssBaseline />
                        <Routes>
                            <Route element={<AuthLayout />}>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />}
                                />
                            </Route>

                            <Route element={<RouteProtector />}>
                                <Route element={<AppLayout />}>
                                    <Route path="/" element={<CatalogoPage />} />

                                    <Route path="/categorias">
                                        <Route index element={<CategoriasPage />} />
                                        <Route path="crear" element={<CrearCategoriaPage />} />
                                        <Route path="actualizar/:categoria_producto_id" element={<ActualizarCategoriaPage />} />
                                    </Route>

                                    <Route path="/usuarios" element={<UsuariosPage />} />

                                    <Route path="/ordenes" element={<OrdenesPage />} />

                                </Route>
                            </Route>

                            <Route path="/401" element={<UnauthorizedPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </SnackbarProvider>
                </ThemeProvider>
            </AppProvider>
        </AuthProvider>
    );
};

export default App;
