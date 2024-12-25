import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

import { Routes, Route } from 'react-router';
import {
    CatalogoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    RegisterPage,
    UsuariosPage
} from './pages';
import { AppLayout, AuthLayout } from './layouts';

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<AppLayout />}>
                <Route path="/" element={<CatalogoPage />} />
                
                <Route path="/categorias" element={<CategoriasPage />} />
                
                <Route path="/usuarios" element={<UsuariosPage />} />
                
                <Route path="/ordenes" element={<OrdenesPage />} />
                
            </Route>
        </Routes>
    </ThemeProvider>
);

export default App;
