import { Add } from '@mui/icons-material';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Toolbar
} from '@mui/material';

// Datos de ejemplo para la tabla
const rows = [
    { id: 1, name: 'Producto A', price: 10.5, stock: 25 },
    { id: 2, name: 'Producto B', price: 20.0, stock: 15 },
    { id: 3, name: 'Producto C', price: 5.99, stock: 50 },
    { id: 4, name: 'Producto D', price: 12.49, stock: 10 }
];

export const CatalogoPage = () => {
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
                >
                    Agregar producto
                </Button>
            </Box>
            <Toolbar />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Stock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>${row.price.toFixed(2)}</TableCell>
                                <TableCell>{row.stock}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
