import React, { useState } from "react";
import HomePage from "./pages/HomePage"; // Home Page Component
import RegisterPage from "./pages/RegisterPage"; // Register Page Component
import LoginPage from "./pages/LoginPage"; // Login Page Component
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
// State to track the current active page
const [currentPage, setCurrentPage] = useState("home");
const [token, setToken] = useState(localStorage.getItem("authToken") || ""); // Get token from localStorage

  // Function to switch between pages
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
      case "register":
        return <RegisterPage setCurrentPage={setCurrentPage} />;
        case "login":
          return <LoginPage setToken={setToken} setCurrentPage={setCurrentPage} />;
        case "dashboard":
          return (
            <ProtectedRoute token={token}>
              <Dashboard />
            </ProtectedRoute>
          );
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* <nav style={{ marginBottom: "20px" }}>
        <button
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => setCurrentPage("home")}
        >
          Home
        </button>
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
      </nav> */}
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
