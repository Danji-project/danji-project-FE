import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import RegisterPage from "../pages/register/RegisterPage";
import { LoginPage } from "../pages/login/loginPage";
import { FindInfoPage } from "../pages/find-info/findInfoPage";
import { FindResultPage } from "../pages/find-info/findResultPage";
import RegisterSuccessPage from "../pages/register/RegisterSuccessPage";

const AuthRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/register":
        return <RegisterPage />;
      case "/register-success":
        return <RegisterSuccessPage />;
      case "/login":
        return <LoginPage />;
      case "/find":
        return <FindInfoPage />;
      case "/find-result":
        return <FindResultPage />;
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
