import { Imagen } from "./productos";

export interface AppContextType {
    cartDrawer: boolean;
    setCartDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    productos: ProductOrder[];
    addProduct: (product: ProductOrder) => void;
    deleteProduct: (productId: string) => void;
    updateQuantity: (productId: string, cantidad: number) => void
    clearCart: () => void
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
    userData: IUserData;
    setUserData: (newUserData: IUserData) => void
}

export interface IUserData {
    user_id: number;
    rol_id: number;
    nombre: string;
    rol_nombre: string;
}