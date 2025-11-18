import { Outlet, useLocation } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import RegisterAccount from "../pages/register-account/RegisterAccount";
import RegisterSuccess from "../pages/register-success/RegisterSuccess";
import FindAccount from "../pages/find-account/FindAccount";
import LoginPage from "../pages/login/loginPage";

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
      case "find-account":
        return <FindAccount />;
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
