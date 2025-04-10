import React from "react";
import { usePage } from "../PageContext";

const HomePage = () => {
  const { setCurrentPage, navigate } = usePage();
  console.log("setCurrentPage:", setCurrentPage);
  ;
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
        onClick={() => navigate("register")}
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
        onClick={() => navigate("login")}
      >
        Login
      </button>

    </div>
  );
};

export default HomePage;
