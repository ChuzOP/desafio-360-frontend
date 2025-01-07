import { useContext, useEffect, useState } from 'react';
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    NotInterested
} from '@mui/icons-material';
import {
    Box,
    Typography,
    Toolbar,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Collapse,
    Tooltip
} from '@mui/material';
import { format } from 'date-fns';
import { enqueueSnackbar } from 'notistack';

import { SkeletonTable, ConfirmModal, NoData } from '../../components';
import { cancelarOrden, obtenerOrdenesByUsuarioId } from '../../services';
import { DetalleOrden, IOrdenes } from '../../interfaces';
import { parseMonto } from '../../utils';
import { AuthContext } from '../../context';

export const MisOrdenesPage = () => {
    const { userData } = useContext(AuthContext);

    const [fetching, setFetching] = useState(false);
    const [ordenes, setOrdenes] = useState<IOrdenes[]>([]);

    const getData = async () => {
        setFetching(true);
        try {
            const res = await obtenerOrdenesByUsuarioId(userData.user_id);
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
                    Mis Ordenes
                </Typography>
            </Box>
            <Toolbar />
            <TableContainer component={Paper}>
                {fetching ? (
                    <SkeletonTable />
                ) : ordenes.length === 0 ? (
                    <NoData dialog="No se encontraron Ordenes" />
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
                                <TableCell>Estado</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ordenes.map((orden) => (
                                <Row
                                    key={orden.orden_id}
                                    orden={orden}
                                    getData={getData}
                                />
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    );
};

const Row = ({
    orden,
    getData
}: {
    orden: IOrdenes;
    getData: () => Promise<void>;
}) => {
    const [collapseRow, setCollapseRow] = useState(false);

    const [cancelModal, setCancelModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleCancelOrder = async () => {
        setLoading(true);
        try {
            const res = await cancelarOrden(orden.orden_id);
            if (res.success) {
                enqueueSnackbar(res.message, {
                    variant: 'success'
                });
                getData();
            } else {
                enqueueSnackbar(res.message, {
                    variant: 'error'
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

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
                <TableCell>{orden.estado}</TableCell>
                <TableCell>
                    <Tooltip title="Cancelar Orden" arrow>
                        <span>
                            <IconButton
                                onClick={() => setCancelModal(true)}
                                sx={{
                                    padding: 0
                                }}
                                disabled={orden.estado !== 'En Proceso'}
                            >
                                <NotInterested
                                    style={{
                                        color: 'red'
                                    }}
                                />
                            </IconButton>
                        </span>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={9}
                >
                    <Collapse in={collapseRow} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Typography
                                variant="h5"
                                fontStyle="italic"
                                color="rgb(125, 135, 156)"
                                mb={2}
                            >
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
            <ConfirmModal
                open={cancelModal}
                setOpen={setCancelModal}
                handleConfirm={handleCancelOrder}
                title={'Cancelar Orden'}
                description={
                    'Al cancelar la orden esta no continuará con el proceso y el stock de los productos de la orden será reintegrado. ¿Desea continuar?'
                }
                loading={loading}
            />
        </>
    );
};
