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
      <div style={{ display: "flex" }}>
        <LeftNavigation onSelect={handleTabChange} />
        <div style={{ flex: 1, padding: "20px" }}>
          {/* Render dashboard tabs and stats content only when "dashboard" tab is active */}
          {selectedTab === "dashboard" && (
            <>
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
            </>
          )}

          {/* Render CustomersTable component when "customers" tab is active */}
          {selectedTab === "customers" && <CustomersTable />}

          {/* Placeholder content for other tabs */}
          {selectedTab === "accounts" && <h2>Accounts Content</h2>}
          {selectedTab === "finance" && <h2>Finance Transactions Content</h2>}
          {selectedTab === "expenses" && <h2>Expenses Content</h2>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
