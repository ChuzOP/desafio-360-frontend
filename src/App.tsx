import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

import { Routes, Route } from 'react-router';
import {
    Catalogo,
    Categorias,
    Login,
    Ordenes,
    Register,
    Usuarios
} from './pages';
import { AppLayout, AuthLayout } from './layouts';

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<AppLayout />}>
                <Route path="/" element={<Catalogo />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/ordenes" element={<Ordenes />} />
            </Route>
        </Routes>
    </ThemeProvider>
);

export default App;
