import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InstallmentDetails = () => {
    // alert("InstallmentDetails component loaded");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const location = useLocation();
    // const financeData = location.state;
    const storedFinanceData = localStorage.getItem("financeData");
    const financeData = storedFinanceData ? JSON.parse(storedFinanceData) : null;
    alert("financeData" + financeData);
    const handlePrint = () => {
        window.print(); // Trigger browser print functionality
    };
    useEffect(() => {
        console.log("Finance Data Received:", financeData);
    }, [financeData]);

    useEffect(() => {
        if (!financeData) {
            console.error("No finance data found, redirecting...");
            navigate("/newFinance"); // Redirect if missing
        }
    }, [financeData]);

    return (
        <div className="installment-details">
            <h2>Installment Details</h2>
            <p><strong>Customer Name:</strong> {financeData.customer_name || "N/A"}</p>
            <p><strong>Finance Amount:</strong> ${financeData.loan_amount}</p>
            <p><strong>Interest Rate:</strong> {financeData.interest_rate}%</p>
            <p><strong>Disbursed Amount:</strong> ${financeData.dispersed_amount}</p>
            <p><strong>No of Installments:</strong> {financeData.no_of_installments}</p>
            <p><strong>From:</strong> {financeData.start_date} <strong>To:</strong> {financeData.end_date}</p>

            <h3>Installments Breakdown</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Date</th>
                        <th>Amount Paid</th>
                        <th>Amount To Be Paid</th>
                        <th>Outstanding Balance</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {financeData.no_of_installments.map((installment) => (
                        <tr key={installment.s_no}>
                            <td>{installment.s_no}</td>
                            <td>{installment.date}</td>
                            <td>${installment.amount_paid}</td>
                            <td>${installment.amount_to_be_paid || "N/A"}</td>
                            <td>${installment.outstanding_balance}</td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>
    );
};

export default InstallmentDetails;
