import React from "react";
import { usePage } from "./PageContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import CustomersTable from "./components/Customers/CustomersTable";
import CreateCustomerForm from "./components/Customers/CreateCustomerForm";
import EditCustomerForm from "./components/Customers/EditCustomerForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountsTable from "./components/Accounts/AccountsTable";
import NewFinanceForm from "./components/Accounts/NewFinanceForm";
import InstallmentDetails from "./components/Accounts/InstallmentDetails";

const AppContent = () => {
  const { setCurrentPage, currentPage } = usePage();

  // const renderContent = () => {
  switch (currentPage) {
    case "home":
      return <HomePage />;
    case "register":
      return <RegisterPage />;
    case "login":
      return <LoginPage />;
    case "dashboard":
      return (
        <ProtectedRoute >
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      );
    case "customers":
      return (
        <ProtectedRoute >
          <Layout>
            <CustomersTable />
          </Layout>
        </ProtectedRoute>
      );
    case "create-customer":
      return (
        <ProtectedRoute >
          <Layout>
            <CreateCustomerForm />
          </Layout>
        </ProtectedRoute>
      );
    case "edit-customer":
      return (
        <ProtectedRoute >
          <Layout>
            <EditCustomerForm />
          </Layout>
        </ProtectedRoute>
      );
    case "accounts":
      return (
        <ProtectedRoute >
          <Layout>
            <AccountsTable />
          </Layout>
        </ProtectedRoute>
      );
    case "new-finance":
      return (
        <ProtectedRoute >
          <Layout>
            <NewFinanceForm />
          </Layout>
        </ProtectedRoute>
      );
    case "finance-installments":
      return (
        <ProtectedRoute >
          <Layout>
            <InstallmentDetails />
          </Layout>
        </ProtectedRoute>
      );
    default:
      return <HomePage />;
  }
};

export default AppContent;
