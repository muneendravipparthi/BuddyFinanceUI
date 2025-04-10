import React, { useState } from "react";
import "../styles/Layout.css";
import { usePage } from "../PageContext";


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
    </div>
  );
};

export default Dashboard;
