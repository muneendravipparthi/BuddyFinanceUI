import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const saveToken = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    return (
        <AuthContext.Provider value={{ authToken, saveToken }}>
            {children}
        </AuthContext.Provider>
    );
};
