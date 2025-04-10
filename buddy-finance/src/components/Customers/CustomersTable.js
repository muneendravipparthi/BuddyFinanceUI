import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import CreateCustomerForm from "./CreateCustomerForm";
import { usePage } from "../../PageContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './CustomersTable.css';

const CustomersTable = () => {
    const { setCurrentPage, setCurrentCustomer } = usePage();
    const { authToken } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false); // Track visibility
    const token = localStorage.getItem("authToken");

    // Fetch customer data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/v1/customers", {
                    method: "GET",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
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
        setShowCreateForm(true); // Show the form
    };

    const handleBackToTable = () => {
        setShowCreateForm(false); // Show the table
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
                    <button className="edit-customer-icon" onClick={() => handleEditCustomer(row)} title="Edit Customer" >
                        <i class="fa-solid fa-pencil"></i> {/* Replace this with your desired icon */}
                    </button>
                    <button className="delete-customer-icon" onClick={() => handleDeleteCustomer(row)} title="Delete Customer">
                        <i className="fas fa-trash"></i> {/* Replace this with your desired icon */}
                    </button>
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
        <div className="table-container">
            {showCreateForm ? (
                <CreateCustomerForm onBack={handleBackToTable} /> // Pass the handler to the form
            ) : (
                <>
                    <button className="create-customer-btn" onClick={handleCreateCustomer}>
                        Create Customer
                    </button>
                    {loading ? (
                        <p>Loading customer details...</p>
                    ) : (
                        <DataTable
                            className="data-table"
                            title="Customer Details"
                            columns={columns}
                            data={data}
                            pagination
                            highlightOnHover
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CustomersTable;
