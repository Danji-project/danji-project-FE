import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import RegisterPage from "../pages/register/RegisterPage";

const AuthRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/register":
        return <RegisterPage />;
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
