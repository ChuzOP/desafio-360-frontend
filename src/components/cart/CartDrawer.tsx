import { useContext } from 'react';
import { AppContext } from '../../context';
import {
    Box,
    Drawer,
    Divider,
    Button,
    IconButton,
    Typography
} from '@mui/material';
import {
    Close as CloseIcon,
    Remove,
    Add,
    ShoppingBagOutlined
} from '@mui/icons-material';
import { ProductOrder } from '../../interfaces';
import { getImage } from '../../utils';

export const CartDrawer = () => {
    const {
        cartDrawer,
        setCartDrawer,
        productos,
        deleteProduct,
        updateQuantity
    } = useContext(AppContext);

    const handleTotal = (products: ProductOrder[]) => {
        return products.reduce((acc, product) => {
            return acc + product.precio * product.cantidad;
        }, 0);
    };

    return (
        <Drawer
            anchor={'right'}
            open={cartDrawer}
            onClose={() => setCartDrawer(false)}
        >
            <Box
                sx={{
                    paddingY: 2,
                    width: 350,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingX: 2
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingBagOutlined />
                        <Typography variant="body2" color="rgb(125, 135, 156)">
                            {productos.length} producto
                            {productos.length > 1 && 's'}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={() => setCartDrawer(false)}
                        sx={{ float: 'right' }}
                    >
                        <CloseIcon style={{ color: '#e02828' }} />
                    </IconButton>
                </Box>

                <Divider sx={{ marginY: 2 }} />

                <ProductList
                    products={productos}
                    deleteProduct={deleteProduct}
                    updateQuantity={updateQuantity}
                />

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2, width: '90%', alignSelf: 'center' }}
                >
                    Ir al Checkout (Q.{handleTotal(productos).toFixed(2)})
                </Button>
            </Box>
        </Drawer>
    );
};

const ProductList = ({
    products,
    deleteProduct,
    updateQuantity
}: {
    products: ProductOrder[];
    deleteProduct: (productId: string) => void;
    updateQuantity: (productId: string, cantidad: number) => void;
}) => {

    return (
        <Box sx={{ flex: 1, flexGrow: 1, overflowY: 'auto' }}>
            {products.map((product) => (
                <Box
                    key={product.producto_id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 2
                    }}
                >
                    <div
                        style={{
                            width: 70,
                            height: 70,
                            backgroundColor: '#f0f0f0',
                            borderRadius: 8,
                            padding: 1
                        }}
                    >
                        <img
                            src={getImage(product.imagen)}
                            alt={product.nombre}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center',
                            flexGrow: 1,
                            paddingX: 2
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold'
                            }}
                        >
                            {product.nombre}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">
                                Q.{product.precio * product.cantidad}
                            </Typography>
                            <Typography variant="body2" color="rgb(125, 135, 156)" fontStyle={"italic"}>
                                Q.{product.precio} c/u
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                marginTop: 1
                            }}
                        >
                            <IconButton
                                onClick={() =>
                                    updateQuantity(product.producto_id, -1)
                                }
                                disabled={product.cantidad === 1}
                                size="small"
                                sx={{
                                    border: '1px solid #5742e9',
                                    borderRadius: 1,
                                    padding: 0
                                }}
                            >
                                <Remove style={{ color: '#5742e9' }} />
                            </IconButton>
                            <span style={{ padding: '0px 15px' }}>
                                {product.cantidad}
                            </span>
                            <IconButton
                                onClick={() =>
                                    updateQuantity(product.producto_id, 1)
                                }
                                size="small"
                                sx={{
                                    border: '1px solid #5742e9',
                                    borderRadius: 1,
                                    padding: 0
                                }}
                            >
                                <Add style={{ color: '#5742e9' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <IconButton
                        onClick={() => deleteProduct(`${product.producto_id}`)}
                    >
                        <CloseIcon style={{ color: '#e02828' }} />
                    </IconButton>
                </Box>
            ))}
        </Box>
    );
};
