import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { Button } from '@mui/material';

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
            <h1>Bienvenido a MUI con Vite</h1>
            <Button variant="contained">Hello world</Button>
        </div>
    </ThemeProvider>
);

export default App;
