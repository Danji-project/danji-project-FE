import { Outlet, useLocation } from "react-router-dom";
import MyPage from "../pages/my-pages/MyPage";

export const MyPageRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/my-page":
        return <MyPage />;
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};
