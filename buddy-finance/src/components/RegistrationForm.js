import React, { useState } from 'react';
import './RegistrationForm.css';
import { usePage } from "../PageContext";

const RegistrationForm = () => {
  const { setCurrentPage } = usePage();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = { firstname, lastname, email, phone, password };

    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Registration successful!");
        setCurrentPage("login");// Redirect to login page
      }
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      if (result.error) {
        setError(result.error);
        console.log("API Error:", result.error); // Debugging
        return;
      }

    } catch (error) {
      setError('Error during registration. Please try again.' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>First Name</label>
        <input type="text" name="firstname" onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name="lastname" onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Phone</label>
        <input type="text" name="phone" onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
