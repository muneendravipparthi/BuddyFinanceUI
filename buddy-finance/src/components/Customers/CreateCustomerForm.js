import React, { useState } from 'react';

const CreateCustomerForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        aadharNumber: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Customer Created:', formData);
        alert('Customer Created Successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Customer</h2>
            <input type="text" placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            <input type="text" placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            <input type="text" placeholder="Phone Number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <input type="text" placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            <input type="text" placeholder="Aadhar Number" onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateCustomerForm;
