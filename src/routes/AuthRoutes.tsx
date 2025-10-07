import { Outlet, useLocation } from "react-router-dom";
import RegisterPage from "../pages/register/RegisterPage";
import { LoginPage } from "../pages/login/loginPage";
import { FindInfoPage } from "../pages/find-info/findInfoPage";
import { FindResultPage } from "../pages/find-info/findResultPage";
import { ResetPasswordPage } from "../pages/find-info/resetPasswordPage";
import RegisterSuccessPage from "../pages/register/RegisterSuccessPage";
import { MainPage } from "../pages/main/MainPage";
import DetailApartInfo from "../pages/detail-apart-info/DetailApartInfo";

const AuthRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return <MainPage/>;
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
      case "/apart-Info":
        return <DetailApartInfo/>
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
