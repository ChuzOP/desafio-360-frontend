import { createContext } from 'react';
import { AppContextType } from '../interfaces';

export const AppContext = createContext<AppContextType>({});

export const AppProvider = ({ children }: any) => {
    const value = {};

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
