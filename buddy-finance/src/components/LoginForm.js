import React, { useState } from 'react';
import { usePage } from "../PageContext";
import Cookies from "js-cookie";
import HomePage from "../pages/HomePage"; // Import HomePage for the Cancel button

const LoginForm = () => {
  const { setCurrentPage, navigate } = usePage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const loginData = { email, password };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log("Login successful!");
        const result = await response.json();
        Cookies.set("authToken", "Bearer " + result.token, { expires: 1, secure: true, sameSite: "Strict" });
        // window.location.reload(); // Ensure state sync after login
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('authToken', "Bearer " + result.token);
        sessionStorage.setItem('authToken', "Bearer " + result.token);
        // Redirect to dashboard by updating currentPage
        navigate("dashboard");
      }

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      if (result.error) {
        setError(result.error);
        return;
      }

    } catch (error) {
      setError('Login failed. Please try again.' + error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder='Enter Email example@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder='XXXXXXXXX'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate("home")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
