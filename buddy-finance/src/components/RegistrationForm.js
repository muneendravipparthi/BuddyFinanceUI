import React, { useState } from 'react';

const RegistrationForm = ({ setCurrentPage }) => {
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

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      if (result.error) {
        setError(result.error);
        return;
      }
      // alert("Registration successful!");
     // Redirect to dashboard by updating currentPage
     setCurrentPage("login");
     
    } catch (error) {
      alert(error.message);
      alert("Error during registration. Please try again.");
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
