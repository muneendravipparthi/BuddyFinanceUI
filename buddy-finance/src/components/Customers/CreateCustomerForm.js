import React, { useState } from 'react';
import './CreateCustomerForm.css';

const CreateCustomerForm = ({ onBack }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        aadharNumber: '',
    });
    const [error, setError] = useState('');

    const token = localStorage.getItem('authToken'); // Retrieve the auth token
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            mobile: formData.phone,
            contact_1: formData.phone, // Assuming contact_1 matches phone
            contact_2: '', // Add secondary contact if needed
            aadhar_number: formData.aadharNumber,
            home_address: formData.address,
            business_address: '', // Add business address if available
            occupation: 'Engineer', // Example occupation
            rating: 5, // Example rating
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/api/v1/createCustomer", {
                method: "POST",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create customer");
            }

            const result = await response.json();
            console.log("Customer Created Successfully:", result);
            // alert("Customer Created Successfully!");
            onBack(); // Navigate back to the table
        } catch (error) {
            console.error("Error creating customer:", error);
            alert("Failed to create customer. Please try again.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Create Customer</h2>
            <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Phone Number"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
                type="text"
                placeholder="Address"
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <input
                type="text"
                placeholder="Aadhar Number"
                onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
            <button type="button" onClick={onBack}>Cancel</button> {/* Back to table */}
        </form>
    );
};

export default CreateCustomerForm;
