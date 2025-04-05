import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/register", formData);
      console.log(response.data);
      alert("Registration successful!");
    } catch (error) {
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>First Name</label>
        <input type="text" name="firstname" onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name="lastname" onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />
      </div>
      <div>
        <label>Phone</label>
        <input type="text" name="phone" onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
