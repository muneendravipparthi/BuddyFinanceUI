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
    default:
      return <HomePage />;
  }
};

//   return (
//     <Layout onSelect={setCurrentPage}>
//       {renderContent()} {/* Render main content */}
//     </Layout>
//   );
// };

export default AppContent;
