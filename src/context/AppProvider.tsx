import { useState } from 'react';
import { AppContext } from './AppContext';

export const AppProvider = ({ children }: any) => {
    const value = {};

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
