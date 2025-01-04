import { createContext, useEffect, useReducer, useState } from 'react';
import { AppContextType, ProductOrder } from '../interfaces';
import { cartReducer } from '../reducers';

export const AppContext = createContext<AppContextType>({
    cartDrawer: false,
    setCartDrawer: () => false,
    productos: [],
    addProduct: () => {},
    deleteProduct: () => {},
    updateQuantity: () => {},
    clearCart: () => {}
});

const loadInitialState = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { productos: [] };
};

export const AppProvider = ({ children }: any) => {
    const [cartDrawer, setCartDrawer] = useState(false);

    const [state, dispatch] = useReducer(cartReducer, loadInitialState());

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addProduct = (product: ProductOrder) => {
        dispatch({ type: 'AddProduct', payload: product });
    };

    const deleteProduct = (productId: string) => {
        dispatch({ type: 'DeleteProduct', payload: productId });
    };

    const updateQuantity = (productId: string, cantidad: number) => {
        dispatch({ type: 'UpdateQuantity', payload: { producto_id: productId, cantidad } });
    };

    const clearCart = () => {
        dispatch({ type: 'ClearCart' });
    };

    const value = {
        cartDrawer,
        setCartDrawer,
        productos: state.productos,
        addProduct,
        deleteProduct,
        updateQuantity,
        clearCart
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
