import { Add, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    Toolbar,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Collapse
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SkeletonTable } from '../../components';
import { obtenerOrdenes } from '../../services';
import { DetalleOrden, IOrdenes } from '../../interfaces';
import { format } from 'date-fns';
import { parseMonto } from '../../utils';

export const OrdenesPage = () => {
    const [fetching, setFetching] = useState(false);
    const [ordenes, setOrdenes] = useState<IOrdenes[]>([]);

    const getData = async () => {
        setFetching(true);
        try {
            const res = await obtenerOrdenes();
            if (res.success) {
                setOrdenes(res.data);
            }
        } catch (error) {
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

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
                    Ordenes
                </Typography>
            </Box>
            <Toolbar />
            <TableContainer component={Paper}>
                {fetching ? (
                    <SkeletonTable />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>ID</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Télefono</TableCell>
                                <TableCell>Fecha de Entrega</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ordenes.map((orden) => (
                                <Row key={orden.orden_id} orden={orden} />
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    );
};

const Row = ({ orden }: { orden: IOrdenes }) => {
    const [collapseRow, setCollapseRow] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setCollapseRow(!collapseRow)}
                    >
                        {collapseRow ? (
                            <KeyboardArrowUp />
                        ) : (
                            <KeyboardArrowDown />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell>{orden.orden_id}</TableCell>
                <TableCell>{orden.direccion}</TableCell>
                <TableCell>{orden.telefono}</TableCell>
                <TableCell>
                    {format(new Date(orden.fecha_entrega), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>Q.{parseMonto(orden.total_orden)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={collapseRow} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Typography variant="h5" fontStyle="italic" color="rgb(125, 135, 156)" mb={2}>
                                Detalles de la Orden
                            </Typography>
                            <Box
                                sx={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1
                                }}
                            >
                                <Table size="small" aria-label="detalle">
                                    <TableHead
                                        sx={{ backgroundColor: '#b7b1e0' }}
                                    >
                                        <TableRow>
                                            <TableCell>ID Producto</TableCell>
                                            <TableCell>Cantidad</TableCell>
                                            <TableCell>Precio</TableCell>
                                            <TableCell>Subtotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orden.detalle_orden.map(
                                            (detalle: DetalleOrden) => (
                                                <TableRow
                                                    key={
                                                        detalle.orden_detalle_id
                                                    }
                                                >
                                                    <TableCell>
                                                        {detalle.producto_id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {detalle.cantidad}
                                                    </TableCell>
                                                    <TableCell>
                                                        {detalle.precio}
                                                    </TableCell>
                                                    <TableCell>
                                                        Q.
                                                        {parseMonto(
                                                            detalle.subtotal
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
