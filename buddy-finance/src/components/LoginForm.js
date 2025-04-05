import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  // Initialize formData with keys for controlled inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", formData);
      alert("Login successful!");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email} // Add value attribute for controlled input
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password} // Add value attribute for controlled input
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
