import { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, IUserData } from '../interfaces';

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => false,
    userData: {
        user_id: 0,
        rol_id: 0,
        nombre: ''
    },
    setUserData: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth === 'true';
    });

    const [userData, setUserDataState] = useState<IUserData>(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData
            ? JSON.parse(storedUserData)
            : { user_id: 0, rol_id: 0, nombre: '' };
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    const setUserData = (newUserData: IUserData) => {
        setUserDataState(newUserData);
    };

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        userData,
        setUserData
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
