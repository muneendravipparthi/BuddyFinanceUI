import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import CreateCustomerForm from "./CreateCustomerForm";
import { usePage } from "../../PageContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './styles/CustomersTable.css';
import EditCustomerForm from "./EditCustomerForm"; // Import edit form component


const CustomersTable = () => {
    const { setCurrentPage, setCurrentCustomer, currentCustomer } = usePage();
    const { authToken } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const token = localStorage.getItem("authToken");

    // Fetch customer records from API
    const fetchData = async () => {
        try {
            setLoading(true); // Set loading to true before fetching
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
            setLoading(false); // Stop loading once data is fetched
        }
    };

    // Call fetchData() initially
    useEffect(() => {
        if (!showEditForm && !showCreateForm) {
            fetchData(); // Refresh customer records only when forms are closed
        }
    }, [showEditForm, showCreateForm]); // Depend on form visibility

    const handleCreateCustomer = () => {
        setShowCreateForm(true);
    };

    const handleBackToTable = () => {
        setShowCreateForm(false);
        setShowEditForm(false);
        fetchData(); // Refresh customer records when navigating back
    };

    const handleEditCustomer = (customer) => {
        setCurrentCustomer(customer);
        setShowEditForm(true);
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
                    <button className="edit-customer-icon" onClick={() => handleEditCustomer(row)} title="Edit Customer">
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button className="delete-customer-icon" onClick={() => handleDeleteCustomer(row)} title="Delete Customer">
                        <i className="fas fa-trash"></i>
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
                <CreateCustomerForm onBack={handleBackToTable} />
            ) : showEditForm ? (
                <EditCustomerForm onBack={handleBackToTable} />
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
