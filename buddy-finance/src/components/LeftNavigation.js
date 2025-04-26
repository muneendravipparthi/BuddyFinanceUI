import React, { useState } from 'react';
import '../styles/LeftNavigation.css';
import { useNavigate } from "react-router-dom";

const LeftNavigation = ({ onSelect }) => {
    const [activeTab, setActiveTab] = useState('dashboard'); // Default active tab
    const navigate = useNavigate();

    const handleTabClick = (tabName) => {
        setActiveTab(tabName); // Update the active tab
        onSelect(tabName);
        navigate("/" + tabName)// Notify parent component about the tab change
    };

    return (
        <div className="left-navigation">
            <ul>
                <li
                    className={activeTab === 'dashboard' ? 'active' : ''}
                    onClick={() => handleTabClick('dashboard')}
                >
                    Dashboard
                </li>
                <li
                    className={activeTab === 'customers' ? 'active' : ''}
                    onClick={() => handleTabClick('customers')}
                >
                    Customers
                </li>
                <li
                    className={activeTab === 'accounts' ? 'active' : ''}
                    onClick={() => handleTabClick('accounts')}
                >
                    Accounts
                </li>
                <li
                    className={activeTab === 'finance' ? 'active' : ''}
                    onClick={() => handleTabClick('finance')}
                >
                    Finance Transactions
                </li>
                <li
                    className={activeTab === 'expenses' ? 'active' : ''}
                    onClick={() => handleTabClick('expenses')}
                >
                    Expenses
                </li>
            </ul>
        </div>
    );
};

export default LeftNavigation;
