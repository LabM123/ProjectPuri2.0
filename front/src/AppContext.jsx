import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem('AppPuri');
        return savedData ? JSON.parse(savedData) : {};
    });

    useEffect(() => {
        localStorage.setItem('AppPuri', JSON.stringify(data));
    }, [data]);

    return (
        <AppContext.Provider value={{ data, setData }}>
        {children}
        </AppContext.Provider>
    );
};
