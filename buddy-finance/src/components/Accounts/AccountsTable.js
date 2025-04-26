import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import NewFinanceForm from "./NewFinanceForm"; // Import the finance form

const AccountsTable = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFinanceForm, setShowFinanceForm] = useState(false); // Toggle state
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/v1/finance", {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch accounts");
                }

                const result = await response.json();
                setAccounts(result);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!showFinanceForm) fetchAccounts(); // Refresh accounts when returning

    }, [showFinanceForm]);

    const columns = [
        { name: "Customer Name", selector: (row) => row.customer_name, sortable: true },
        { name: "Loan Amount", selector: (row) => row.loan_amount, sortable: true },
        { name: "Dispersed Amount", selector: (row) => row.dispersed_amount, sortable: true },
        { name: "No Of Installments", selector: (row) => row.no_of_installments, sortable: true },
        { name: "Paid Installments", selector: (row) => row.paid_installments, sortable: true },
        { name: "Pending Installments", selector: (row) => row.pending_installments, sortable: true },
        { name: "Cleared Amount", selector: (row) => row.cleared_amount, sortable: true },
        { name: "Pending Balance", selector: (row) => row.pending_amount, sortable: true },
        { name: "Due Date", selector: (row) => row.end_date, sortable: true },
        { name: "Status", selector: (row) => row.status, sortable: true },
    ];

    return (
        <div className="accounts-container">
            {showFinanceForm ? (
                <NewFinanceForm onCancel={() => setShowFinanceForm(false)} />
            ) : (
                <>
                    <button className="new-finance-btn" onClick={() => setShowFinanceForm(true)}>
                        New Finance
                    </button>

                    {loading ? (
                        <p>Loading account details...</p>
                    ) : (
                        <DataTable title="Account Details" columns={columns} data={accounts} pagination highlightOnHover />
                    )}
                </>
            )}
        </div>
    );
};

export default AccountsTable;
