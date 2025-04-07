import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // const { authToken } = useContext(AuthContext);
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the child component (Dashboard in this case)
  return children;
};

export default ProtectedRoute;
