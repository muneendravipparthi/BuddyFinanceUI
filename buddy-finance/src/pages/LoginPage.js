import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = ({ setCurrentPage }) => {
  console.log("setCurrentPage:", setCurrentPage);
  return <LoginForm setCurrentPage={setCurrentPage} />;
};

export default LoginPage;
