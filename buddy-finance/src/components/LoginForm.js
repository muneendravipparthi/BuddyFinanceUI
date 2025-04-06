import React, { useState } from 'react';
import { usePage } from "../PageContext";

const LoginForm = () => {
  const { setCurrentPage } = usePage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log("Login successful!");
        const result = await response.json();
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('authToken', "Bearer " + result.token);
        // Redirect to dashboard by updating currentPage
        setCurrentPage("dashboard");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
