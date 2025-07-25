import { useLocation } from "react-router-dom";
import Header from "../layouts/Header";
import Settings from "../pages/settings/Settings";

export const SettingsRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    const pathname = location.pathname;

    if (pathname === "/settings") {
      return (
        <>
          <Header title="프로필 수정" type="sub" hasBackButton={true} />
          <Settings />
        </>
      );
    }
  };

  return renderContent();
};
