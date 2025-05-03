import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const InstallmentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const financeData = location.state || JSON.parse(localStorage.getItem("financeData"));

    useEffect(() => {
        if (!financeData) {
            console.error("No finance data found, redirecting...");
            navigate("/newFinance");
        }
    }, [financeData]);

    const handleBack = () => {
        navigate("/newFinance");
    };

    const handleConfirm = () => {
        alert("Finance finalized successfully!");
        navigate("/accounts");
    };

    return (
        <div className="installment-details">
            <h2>Installment Details</h2>
            <p><strong>Customer Name:</strong> {financeData?.customer_name || "N/A"}</p>
            <p><strong>Finance Amount:</strong> ${financeData?.loan_amount}</p>
            <p><strong>Interest Rate:</strong> {financeData?.interest_rate}%</p>
            <p><strong>Disbursed Amount:</strong> ${financeData?.dispersed_amount}</p>
            <p><strong>No of Installments:</strong> {financeData?.no_of_installments}</p>
            <p><strong>From:</strong> {financeData?.start_date} <strong>To:</strong> {financeData?.end_date}</p>

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
                <tbody>
                    {Array.from({ length: financeData.no_of_installments }, (_, i) => {
                        const installmentDate = new Date(financeData.start_date);
                        installmentDate.setDate(installmentDate.getDate() + i);
                        return (
                            <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>{installmentDate.toISOString().split("T")[0]}</td>
                                <td>${i < financeData.paid_installments ? financeData.installment_amount : 0}</td>
                                <td>${financeData.installment_amount}</td>
                                <td>${Math.max(financeData.loan_amount - (i + 1) * financeData.installment_amount, 0)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="button-group">
                <button onClick={handleBack}>Back</button>
                <button onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    );
};

export default InstallmentDetails;
