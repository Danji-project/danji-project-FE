import { Outlet, useLocation } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterAccount from "../pages/register-account/RegisterAccount";

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
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
