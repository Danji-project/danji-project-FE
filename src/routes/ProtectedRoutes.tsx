import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserInfoContext";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  redirectPath: string;
}

const ProtectedRoutes = ({
  children,
  redirectPath = "/login",
}: ProtectedRoutesProps) => {
  const user = useContext(UserContext);

  if (!user.isLogin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
