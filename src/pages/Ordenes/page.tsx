import { Add } from '@mui/icons-material';
import { Box, Typography, Button, Toolbar } from '@mui/material';

export const OrdenesPage = () => {
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
                    Catálogo de productos
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add style={{ color: '#fff' }} />}
                    // onClick={() => push('/categorias/crear')}
                >
                    Agregar Categoria
                </Button>
            </Box>
            <Toolbar />
            <Box>ola</Box>
        </Box>
    );
};
