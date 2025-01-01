import { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType } from '../interfaces';

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => false
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    }, [isAuthenticated]);

    const value = { isAuthenticated, setIsAuthenticated };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
