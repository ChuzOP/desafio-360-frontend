import { createContext, useReducer, useState } from 'react';
import { AppContextType, ProductOrder } from '../interfaces';
import { cartReducer } from '../reducers';

export const AppContext = createContext<AppContextType>({
    cartDrawer: false,
    setCartDrawer: () => false,
    productos: [],
    addProduct: () => {},
    deleteProduct: () => {},
    updateQuantity: () => {}
});

export const AppProvider = ({ children }: any) => {
    const [cartDrawer, setCartDrawer] = useState(false);

    const [state, dispatch] = useReducer(cartReducer, { productos: [] });

    const addProduct = (product: ProductOrder) => {
        dispatch({ type: 'AddProduct', payload: product });
    };

    const deleteProduct = (productId: string) => {
        dispatch({ type: 'DeleteProduct', payload: productId });
    };

    const updateQuantity = (productId: string, cantidad: number) => {
        dispatch({ type: 'UpdateQuantity', payload: { producto_id: productId, cantidad } });
    };

    const value = {
        cartDrawer,
        setCartDrawer,
        productos: state.productos,
        addProduct,
        deleteProduct,
        updateQuantity
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
