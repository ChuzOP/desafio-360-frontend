import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { Routes, Route } from 'react-router';
import {
    ActualizarCategoriaPage,
    ActualizarProductoPage,
    CatalogoPage,
    CategoriasPage,
    CheckoutPage,
    CrearCategoriaPage,
    CrearProductoPage,
    CrearUsuarioPage,
    HomePage,
    LoginPage,
    NotAllowedPage,
    NotFoundPage,
    OrdenesPage,
    ProductosPage,
    RegisterPage,
    UnauthorizedPage,
    UpdateUsuarioPage,
    UsuariosPage
} from './pages';
import { AppLayout, AuthLayout } from './layouts';

import RouteProtector from './utils/RouteProtector';
import RolProtector from './utils/RolProtector';
import Providers from './utils/Providers';

const App: React.FC = () => {
    return (
        <Providers>
            <CssBaseline />
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route element={<RouteProtector />}>
                    <Route element={<RolProtector />}>
                        <Route element={<AppLayout />}>

                            <Route path="/" element={<HomePage />} />

                            <Route path="/catalogo">
                                <Route index element={<CatalogoPage />} />
                                <Route path="checkout" element={<CheckoutPage />} />
                            </Route>

                            <Route path="/productos">
                                <Route index element={<ProductosPage />} />
                                <Route path="crear" element={<CrearProductoPage />} />
                                <Route path="actualizar/:producto_id" element={<ActualizarProductoPage />} />
                            </Route>

                            <Route path="/categorias">
                                <Route index element={<CategoriasPage />} />
                                <Route path="crear" element={<CrearCategoriaPage />} />
                                <Route path="actualizar/:categoria_producto_id" element={<ActualizarCategoriaPage />} />
                            </Route>

                            <Route path="/usuarios">
                                <Route index element={<UsuariosPage />} />
                                <Route path="crear" element={<CrearUsuarioPage />} />
                                <Route path="actualizar/:usuario_id" element={<UpdateUsuarioPage />} />
                            </Route>

                            <Route path="/ordenes" element={<OrdenesPage />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="/401" element={<UnauthorizedPage />} />
                <Route path="/403" element={<NotAllowedPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Providers>
    );
};

export default App;
