import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        },
        unit: 'px'
    },
    direction: 'ltr',
    palette: {
        mode: 'light',
        primary: {
            main: '#5742e9'
        },
        secondary: {
            main: '#b9f308'
        },
        background: {
            default: '#F7F7F7',
        },
        text: {
            primary: '#2e2e2e',
            secondary: '#757575',
            disabled: '#6c6c6c'
        },
        error: {
            main: '#ff4d4d'
        },
        warning: {
            main: '#ffc107'
        },
        success: {
            main: '#7cf26e'
        },
        info: {
            main: '#6eb6f2'
        },
        common: {
            black: '#00000',
            white: '#fefefe',
        },
        grey: {
            '50': 'hsl(220, 10%, 95%)',
            '100': 'hsl(220, 10%, 90%)',
            '200': 'hsl(220, 10%, 80%)',
            '300': 'hsl(220, 10%, 70%)',
            '400': 'hsl(220, 10%, 60%)',
            '500': 'hsl(220, 10%, 50%)',
            '600': 'hsl(220, 10%, 40%)',
            '700': 'hsl(220, 10%, 30%)',
            '800': 'hsl(220, 10%, 20%)',
            '900': '#22252a', // gray background
        },
        action: {
            active: 'hsl(0, 0%, 100%)',
            hover: 'rgba(255, 255, 255, 0.08)',
            hoverOpacity: 0.08,
            selected: 'rgba(255, 255, 255, 0.16)',
            selectedOpacity: 0.16,
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(255, 255, 255, 0.12)',
            focusOpacity: 0.12,
            activatedOpacity: 0.24
        },
    },
    // shape: {
    //     borderRadius: 12
    // },
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',
        h1: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: 'clamp(2.5rem, 1.125rem + 3.5vw, 3.5em)',
            fontWeight: 600,
            lineHeight: 1.1142857142857143,
            letterSpacing: -0.2,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        h2: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
            fontWeight: 600,
            lineHeight: 1.2222222222222223,
            letterSpacing: -0.2,
            color: 'hsl(215, 15%, 92%)',
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        h3: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: '2.25rem',
            lineHeight: 1.2222222222222223,
            letterSpacing: 0.2,
            fontWeight: 400,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        h4: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: '1.875rem',
            lineHeight: 1.5,
            letterSpacing: 0.2,
            fontWeight: 400,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        h5: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: '1.5rem',
            lineHeight: 1.5,
            letterSpacing: 0.1,
            color: 'hsl(210, 100%, 70%)',
            fontWeight: 400,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        h6: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: '1.25rem',
            lineHeight: 1.5,
            fontWeight: 500,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        button: {
            textTransform: 'initial',
            fontWeight: 700,
            letterSpacing: 0,
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: '0.875rem',
            lineHeight: 1.75,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        subtitle1: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: '1.125rem',
            lineHeight: 1.3333333333333333,
            letterSpacing: 0,
            fontWeight: 500,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        body1: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: 0,
            fontWeight: 400,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        body2: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            letterSpacing: 0,
            fontWeight: 400,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        caption: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            display: 'inline-block',
            fontSize: '0.75rem',
            lineHeight: 1.5,
            letterSpacing: 0,
            fontWeight: 700,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        subtitle2: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.57,
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        overline: {
            fontFamily: '"Inter", "Roboto", sans-serif',
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 2.66,
            textTransform: 'uppercase',
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        allVariants: {
            scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
        },
        htmlFontSize: 16,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
    },

    shadows: [
        'none',
        '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
        '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
        '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
        '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
        '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
        '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
        '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
        '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
        '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
        '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
        '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
        '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
        '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
        '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
        '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
        '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
        '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
        '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
        '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
        '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
        '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
        '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
    ],
    transitions: {
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
        },
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195
        }
    },
    zIndex: {
        mobileStepper: 1000,
        fab: 1050,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4
                    }
                }
            }
        },
        MuiOutlinedInput: {
            defaultProps: {
                fullWidth: true
            },
            styleOverrides: {
                root: {
                    borderRadius: 4
                }
            }
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                color: 'primary',
                fullWidth: true
            },
            styleOverrides: {
                root: {
                    borderRadius: 4
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#707070'
                }
            }
        },
        MuiIcon: {
            styleOverrides: {
                root: {
                    color: '#707070'
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#707070'
                }
            }
        }
    }
});

export default theme;
