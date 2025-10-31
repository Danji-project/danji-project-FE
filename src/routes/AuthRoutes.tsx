import { Outlet, useLocation } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterAccount from "../pages/register-account/RegisterAccount";
import RegisterSuccess from "../pages/register-success/RegisterSuccess";

const AuthRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return <MainPage />;
      case "/login":
        return <LoginPage />;
      case "/register-account":
        return <RegisterAccount />;
      case "/register-success":
        return <RegisterSuccess />;
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
