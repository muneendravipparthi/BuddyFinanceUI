import React from "react";
import '../styles/Layout.css';
import { usePage } from "../PageContext";

const Header = () => {
    const { navigate } = usePage();
    return (
        <header className="header">
            <h1>Buddy Finance</h1>
            <div className="profile-actions">
                <button>Edit Profile</button>
                <button>Settings</button>
                <button type="button" onClick={() => navigate("home")}>
                    Logout
                </button>
            </div>
        </header >
    );
};

export default Header;
