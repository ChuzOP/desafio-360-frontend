import { Imagen } from "./productos";

export interface AppContextType {
    cartDrawer: boolean;
    setCartDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    productos: ProductOrder[];
    addProduct: (product: ProductOrder) => void;
    deleteProduct: (productId: string) => void;
    updateQuantity: (productId: string, cantidad: number) => void
}

export interface ProductOrder {
    producto_id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    imagen: Imagen;
    stock: number;
};

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
