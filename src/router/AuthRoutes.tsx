import { Outlet, useLocation } from 'react-router-dom';
import { LoginPage } from '../pages/loginPage/loginPage';
import MainPage from '../pages/mainPage/mainPage';
import { FindInfoPage } from '../pages/findInfoPage/findInfoPage';
import { FindResultPage } from '../pages/findInfoPage/findResultPage';
import '../App.css';

const AuthRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/login':
        return <LoginPage />;
      case '/main':
        return <MainPage />;
      case '/find':
        return <FindInfoPage />;
      case '/findresult':
        return <FindResultPage/>;
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes;
