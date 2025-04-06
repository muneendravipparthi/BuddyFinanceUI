import React from "react";
import { usePage } from "../PageContext";
import RegistrationForm from '../components/RegistrationForm';

const RegisterPage = () => {
  const { setCurrentPage } = usePage();
  return <RegistrationForm setCurrentPage={setCurrentPage} />;
};
export default RegisterPage;