import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { usePage } from "../../PageContext";


const CustomersTable = () => {
    const { setCurrentPage, setCurrentCustomer } = usePage();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // For indicating loading state
    const token = localStorage.getItem('authToken');
    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/customers", {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result); // Assuming the API returns an array of customer objects
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch customer details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCreateCustomer = () => {
        alert("Create Customer button clicked");
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
        { name: "First Name", selector: (row) => row.first_name, sortable: true },
        { name: "Last Name", selector: (row) => row.last_name, sortable: true },
        { name: "Phone Number", selector: (row) => row.mobile, sortable: true },
        { name: "Address", selector: (row) => row.home_address, sortable: true },
        { name: "Aadhar Number", selector: (row) => row.aadhar_number, sortable: true },
    ];

    return (
        <div>
            <button onClick={handleCreateCustomer}>Create Customer</button>
            {loading ? (
                <p>Loading customer details...</p>
            ) : (
                <DataTable
                    title="Customer Details"
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                />
            )}
        </div>
    );
};

export default CustomersTable;
