import { Outlet, useLocation } from 'react-router-dom';
import { LoginPage } from '../pages/loginPage/loginPage';
import MainPage from '../pages/mainPage/mainPage';

const AuthRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/login':
        return <LoginPage />;
      case '/main':
        return <MainPage />;
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
