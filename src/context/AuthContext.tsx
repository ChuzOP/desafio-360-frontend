import { createContext, SetStateAction, useState } from 'react';
import { AuthContextType } from '../interfaces';

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => false
});

export const AuthProvider = ({ children }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const value = { isAuthenticated, setIsAuthenticated };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};