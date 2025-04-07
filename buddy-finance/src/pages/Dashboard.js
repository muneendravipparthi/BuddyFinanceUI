import React, { useState } from "react";
import "../styles/Layout.css";
import LeftNavigation from "../components/LeftNavigation";
import CustomersTable from "../components/Customers/CustomersTable"; // Import CustomersTable
import { usePage } from "../PageContext";

const statsData = {
  balance: "$10,000",
  profit: "$3,000",
  amountToBeCollected: "$5,000",
  loss: "$1,000",
};

const Dashboard = () => {
  const { setCurrentPage } = usePage();
  const [selectedTab, setSelectedTab] = useState("dashboard"); // Default tab is "dashboard"
  const [activeTab, setActiveTab] = useState("balance");

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName); // Update the selected tab
    console.log(`Selected Tab: ${tabName}`); // Debugging log
  };

  return (
    <div className="dashboard">
      {/* <>
        <h2>Dashboard Content</h2>
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
      </> */}
    </div>
  );
};

export default Dashboard;
