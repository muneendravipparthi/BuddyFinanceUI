import React, { createContext, useContext, useState } from "react";

// Create the context
const PageContext = createContext();

// Provider component to wrap the app
export const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState("home"); // Default page
    const [currentCustomer, setCurrentCustomer] = useState(null); // Selected customer for editing

    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage, currentCustomer, setCurrentCustomer }}>
            {children}
        </PageContext.Provider>
    );
};

// Custom hook to use the PageContext
export const usePage = () => useContext(PageContext); 