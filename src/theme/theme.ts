import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5e35b1',
            light: '#9162e4',
            dark: '#280680',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#1e88e5',
            light: '#6ab7ff',
            dark: '#005cb2',
            contrastText: '#ffffff'
        },
        background: {
            default: '#f3f3f7',
            paper: '#ffffff'
        },
        text: {
            primary: '#2e2e2e',
            secondary: '#757575'
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.01562em'
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.00833em'
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            letterSpacing: '0em'
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            letterSpacing: '0.00735em'
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            letterSpacing: '0em'
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.0075em'
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.43
        },
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontWeight: 'bold'
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#5e35b1'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                }
            }
        }
    }
});

export default theme;
