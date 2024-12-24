import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    Link as MuiLink
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router';

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

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
                    Register
                </Typography>
                <MuiLink
                    component={Link}
                    to="/login"
                    underline="hover"
                    color="info"
                >
                    Ya tengo cuenta
                </MuiLink>
            </Box>
            <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                required
            />
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    {'Password *'}
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword
                                        ? 'hide the password'
                                        : 'display the password'
                                }
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password *"
                />
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginY: 2 }}
            >
                Login
            </Button>
        </Box>
    );
};
