import React, { useState } from 'react';
import { usePage } from "../../PageContext";
import './styles/CreateCustomerForm.css'; // Use same styling for consistency

const EditCustomerForm = ({ onBack }) => {
    const { currentCustomer } = usePage();
    const [customer, setCustomer] = useState({
        firstName: currentCustomer.first_name,
        lastName: currentCustomer.last_name,
        phone: currentCustomer.mobile,
        address: currentCustomer.home_address,
        aadharNumber: currentCustomer.aadhar_number,
    });

    const token = localStorage.getItem('authToken'); // Retrieve the auth token
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: currentCustomer.id,
            first_name: customer.firstName,
            last_name: customer.lastName,
            mobile: customer.phone,
            contact_1: customer.phone, // Assuming contact_1 matches phone
            contact_2: '', // Add secondary contact if needed
            aadhar_number: customer.aadharNumber,
            home_address: customer.address,
            business_address: currentCustomer.business_address || '', // Preserving business address
            occupation: currentCustomer.occupation || 'Engineer', // Example occupation
            rating: currentCustomer.rating || 5, // Example rating
        };

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/UpdateCustomer/${currentCustomer.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Customer Updated Successfully!");
                onBack(); // Navigate back to the table
            } else {
                alert("Failed to update customer.");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Edit Customer</h2>
            <label>First Name</label>
            <input type="text" name="firstName" value={customer.firstName} onChange={handleChange} />

            <label>Last Name</label>
            <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} />

            <label>Phone Number</label>
            <input type="text" name="phone" value={customer.phone} onChange={handleChange} />

            <label>Address</label>
            <input type="text" name="address" value={customer.address} onChange={handleChange} />

            <label>Aadhar Number</label>
            <input type="text" name="aadharNumber" value={customer.aadharNumber} onChange={handleChange} />

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
            <button type="button" onClick={onBack}>Cancel</button> {/* Back to table */}
        </form>
    );
};

export default EditCustomerForm;
