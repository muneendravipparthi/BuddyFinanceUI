import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PageContext = createContext();

// Provider component to wrap the app
export const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState("home"); // Default page
    const [currentCustomer, setCurrentCustomer] = useState(null); // Selected customer for editing

    // On first load, read the URL and set the correct page
    useEffect(() => {
        const pageFromURL = window.location.pathname.replace("/", "") || "home";
        setCurrentPage(pageFromURL);
    }, []);

    // Update page state & URL path dynamically
    const navigate = (page) => {
        setCurrentPage(page);
        window.history.pushState({}, "", `/${page}`);
    };

    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage, currentCustomer, setCurrentCustomer, navigate }}>
            {children}
        </PageContext.Provider>
    );
};

// Custom hook to use the PageContext
export const usePage = () => useContext(PageContext); 