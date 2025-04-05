import React from "react";
// import Sidebar from "./Sidebar";
import Header from "./Header";
import '../styles/Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <div className="main-content">
                <Header />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default Layout;