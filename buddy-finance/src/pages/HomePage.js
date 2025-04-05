import React from "react";


const HomePage = ({ setCurrentPage }) => {
  console.log("setCurrentPage:", setCurrentPage);
    return (
        <div>
        <h1>Welcome to Buddy Finance</h1>
        <p>Your one-stop solution for all your financial needs.</p>
        <p>Explore our features and services to manage your finances effectively.</p>
        <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => setCurrentPage("register")}
      >
        Register
      </button>
      <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => setCurrentPage("login")}
      >
        Login
      </button>
        
        </div>
    );
};

export default HomePage;
