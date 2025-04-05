import React, { useState } from "react";
import DataTable from "react-data-table-component";

const CustomersTable = ({ setCurrentPage, setCurrentCustomer }) => {
    const [data, setData] = useState([
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
            address: "123 Main St",
            aadharNumber: "XXXX-XXXX-1234",
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            phone: "9876543210",
            address: "456 Elm St",
            aadharNumber: "XXXX-XXXX-5678",
        },
    ]);

    const handleCreateCustomer = () => {
        setCurrentPage("create-customer");
    };

    const handleEditCustomer = (customer) => {
        setCurrentCustomer(customer);
        setCurrentPage("edit-customer");
    };

    const handleDeleteCustomer = (customer) => {
        if (window.confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`)) {
            setData(data.filter((item) => item.id !== customer.id));
        }
    };

    const columns = [
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <button onClick={() => handleEditCustomer(row)}>Edit</button>
                    <button onClick={() => handleDeleteCustomer(row)}>Delete</button>
                </div>
            ),
        },
        { name: "First Name", selector: (row) => row.firstName, sortable: true },
        { name: "Last Name", selector: (row) => row.lastName, sortable: true },
        { name: "Phone Number", selector: (row) => row.phone, sortable: true },
        { name: "Address", selector: (row) => row.address, sortable: true },
        { name: "Aadhar Number", selector: (row) => row.aadharNumber, sortable: true },
    ];

    return (
        <div>
            <button onClick={handleCreateCustomer}>Create Customer</button>
            <DataTable
                title="Customer Details"
                columns={columns}
                data={data}
                pagination
                highlightOnHover
            />
        </div>
    );
};

export default CustomersTable;
