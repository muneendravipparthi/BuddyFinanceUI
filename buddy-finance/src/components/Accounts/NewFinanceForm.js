import React, { useState, useEffect } from "react";
import { usePage } from "../../PageContext";

const NewFinanceForm = ({ onCancel }) => {
    const { setCurrentPage, navigate } = usePage();
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('authToken'); // Retrieve the auth token
    const [financeData, setFinanceData] = useState({
        customerId: "",
        financeAmount: "",
        startDate: new Date().toISOString().split("T")[0], // Default Today
        endDate: "",
        financeType: "Daily",
        collectionTime: "18:00",
        interestRate: "",
    });

    const handleNavigation = (page, result) => {
        navigate(`${page}`, { state: result }); // Navigate with state
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/v1/customers?excludeCustomersWithActiveFinance=true", {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch customers");
                }

                const result = await response.json();
                setCustomers(result);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);



    // Handle form value changes
    const handleChange = (e) => {
        setFinanceData({ ...financeData, [e.target.name]: e.target.value });
    };

    // Ensure end date selection is after start date
    useEffect(() => {
        if (financeData.startDate) {
            const defaultEndDate = new Date(financeData.startDate);
            defaultEndDate.setDate(defaultEndDate.getDate() + 30);
            setFinanceData({ ...financeData, endDate: defaultEndDate.toISOString().split("T")[0] });
        }
    }, [financeData.startDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!financeData.customerId || financeData.financeAmount <= 0) {
            alert("Please select a customer and provide a valid finance amount.");
            return;
        }

        const payload = {
            customer_id: financeData.customerId,
            finance_amount: financeData.financeAmount,
            start_date: financeData.startDate,
            end_date: financeData.endDate,
            finance_type: financeData.financeType,
            collection_time: financeData.collectionTime,
            interest_rate: financeData.interestRate,
        };
        setError("");
        try {
            const response = await fetch("http://127.0.0.1:5000/api/v1/createFinance", {
                method: "POST",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(response.message);
            }

            const result = await response.json();
            console.log("Finance Created Successfully:", result);
            localStorage.setItem("financeData", JSON.stringify(result));
            handleNavigation("finance-installments", result);

        } catch (error) {
            console.error("Error creating finance:", error);
            if (error.message = "Customer already has an active finance account")
                setError(error.message);
            else {
                setError("Failed to create finance. Please try again.");
            }
        }

    };

    return (
        <form className="finance-form" onSubmit={handleSubmit}>
            <h2>New Finance</h2>

            <label>Customer Name</label>
            <select name="customerId" onChange={handleChange}>
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>{`${customer.first_name} ${customer.last_name}`}</option>
                ))}
            </select>

            <label>Finance Amount</label>
            <input type="number" name="financeAmount" value={financeData.financeAmount} onChange={handleChange} />

            <label>Finance Start Date</label>
            <input type="date" name="startDate" value={financeData.startDate} onChange={handleChange} />

            <label>Finance End Date</label>
            <input type="date" name="endDate" value={financeData.endDate} onChange={handleChange} />

            <label>Finance Type</label>
            <select name="financeType" value={financeData.financeType} onChange={handleChange}>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>

            {financeData.financeType === "Daily" && (
                <>
                    <label>Collection Time</label>
                    <input type="time" name="collectionTime" value={financeData.collectionTime} onChange={handleChange} />
                </>
            )}

            {financeData.financeType === "Weekly" && (
                <>
                    <label>Collection Day</label>
                    <select name="collectionDay" onChange={handleChange}>
                        <option value="">Select Day</option>
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>

                    <label>Collection Time</label>
                    <input type="time" name="collectionTime" value={financeData.collectionTime} onChange={handleChange} />
                </>
            )}

            {financeData.financeType === "Monthly" && (
                <>
                    <label>Collection Date</label>
                    <input type="date" name="collectionDate" value={financeData.collectionDate} onChange={handleChange} />

                    <label>Collection Time</label>
                    <input type="time" name="collectionTime" value={financeData.collectionTime} onChange={handleChange} />
                </>
            )}

            <label>Interest Rate (%)</label>
            <input type="number" name="interestRate" value={financeData.interestRate} onChange={handleChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Next</button>
            <button type="button" onClick={onCancel}>Cancel</button> {/* Back to accounts */}
        </form>
    );
};

export default NewFinanceForm;
