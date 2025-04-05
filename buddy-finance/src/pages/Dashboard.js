import React, { useState } from "react";
import '../styles/Layout.css';
import LeftNavigation from '../components/LeftNavigation';

const statsData = {
  balance: "$10,000",
  profit: "$3,000",
  amountToBeCollected: "$5,000",
  loss: "$1,000",
};

const Dashboard = ({ setCurrentPage }) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [activeTab, setActiveTab] = useState("balance");

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName); // Update the selected tab in the parent component
    console.log(`Selected Tab: ${tabName}`); // Optional debugging
  };

  return (
    <div className="dashboard">
      <div style={{ display: 'flex' }}>
        <LeftNavigation onSelect={handleTabChange} />
        <div style={{ flex: 1, padding: '20px' }}>
          {/* Render content based on the selected tab */}
          {selectedTab === 'dashboard' && <h2>Dashboard Content</h2>}
          {selectedTab === 'customers' && <h2>Customers Content</h2>}
          {selectedTab === 'accounts' && <h2>Accounts Content</h2>}
          {selectedTab === 'finance' && <h2>Finance Transactions Content</h2>}
          {selectedTab === 'expenses' && <h2>Expenses Content</h2>}

          <div className="tabs">
            {Object.keys(statsData).map((key) => (
              <button
                key={key}
                className={activeTab === key ? "active-tab" : ""}
                onClick={() => setActiveTab(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          <div className="stats-content">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p>{statsData[activeTab]}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
