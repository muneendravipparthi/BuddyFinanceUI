import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = ({ setCurrentPage }) =>  {
  console.log("setCurrentPage:", setCurrentPage);
  return <LoginForm />;
};

export default LoginPage;
