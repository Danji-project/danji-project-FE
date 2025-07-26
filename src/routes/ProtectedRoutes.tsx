import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserInfo } from "../stores/userStore";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  redirectPath: string;
}

const ProtectedRoutes = ({
  children,
  redirectPath = "/login",
}: ProtectedRoutesProps) => {
  const user = useUserInfo();

  if (!user.isLogin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
