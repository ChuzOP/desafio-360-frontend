import { ProductOrder } from "../interfaces";

type CartAction =
    | { type: 'AddProduct'; payload: ProductOrder }
    | { type: 'DeleteProduct'; payload: string }
    | { type: 'UpdateQuantity'; payload: { producto_id: string; cantidad: number } }

type CartState = {
    productos: ProductOrder[];
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'AddProduct':
            const existingProduct = state.productos.find((prod) => prod.producto_id === action.payload.producto_id);
            
            if (existingProduct) {

                return state;
            }
            return {
                ...state,
                productos: [...state.productos, action.payload],
            };
        case 'DeleteProduct':
            return {
                ...state,
                productos: state.productos.filter(
                    (prod) => prod.producto_id !== action.payload
                ),
            };
        case 'UpdateQuantity': {
            const { producto_id, cantidad } = action.payload;
        
            return {
                ...state,
                productos: state.productos.map((prod) => {
                    if (prod.producto_id === producto_id) {
                        const nuevaCantidad = prod.cantidad + cantidad;
                        return { ...prod, cantidad: Math.max(nuevaCantidad, 1) };
                    }
                    return prod;
                }),
            };
        }
        default:
            return state;
    }
};
