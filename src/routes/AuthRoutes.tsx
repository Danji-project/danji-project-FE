import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import RegisterPage from "../pages/register/RegisterPage";
import { LoginPage } from "../pages/loginPage/loginPage";
import { FindInfoPage } from "../pages/findInfoPage/findInfoPage";
import { FindResultPage } from "../pages/findInfoPage/findResultPage";
import { ResetPasswordPage } from "../pages/findInfoPage/resetPasswordPage";
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
      case "/reset-password":
        return <ResetPasswordPage/>
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
