import React from 'react';
import { AppProvider, AuthProvider } from '../context';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';
import { SnackbarProvider } from 'notistack';

const Providers = ({ children }: any) => {
    return (
        <AuthProvider>
            <AppProvider>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
                            {children}
                        </SnackbarProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </AppProvider>
        </AuthProvider>
    );
};

export default Providers;
