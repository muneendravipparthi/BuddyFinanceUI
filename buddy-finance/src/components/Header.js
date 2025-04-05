import React from "react";
import '../styles/Layout.css';

const Header = () => {
    return (
        <header className="header">
            <h1>Buddy Finance</h1>
            <div className="profile-actions">
                <button>Edit Profile</button>
                <button>Settings</button>
                <button>Logout</button>
            </div>
        </header>
    );
};

export default Header;
