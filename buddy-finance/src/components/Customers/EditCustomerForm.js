import React from 'react';
import { useLocation } from 'react-router-dom';
import { usePage } from "../../PageContext";

const EditCustomerForm = () => {
    const { setCurrentPage } = usePage();
    const { state } = useLocation();
    const { customer } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Customer Updated:', customer);
        alert('Customer Updated Successfully!');
        setCurrentPage("customers");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Customer</h2>
            <input type="text" defaultValue={customer.firstName} />
            <input type="text" defaultValue={customer.lastName} />
            <input type="text" defaultValue={customer.phone} />
            <input type="text" defaultValue={customer.address} />
            <input type="text" defaultValue={customer.aadharNumber} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default EditCustomerForm;
