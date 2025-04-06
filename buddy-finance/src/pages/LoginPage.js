import React from "react";
import LoginForm from "../components/LoginForm";
import { usePage } from "../PageContext";

const LoginPage = () => {
  const { setCurrentPage } = usePage();
  console.log("setCurrentPage:", setCurrentPage);
  return <LoginForm setCurrentPage={setCurrentPage} />;
};

export default LoginPage;
