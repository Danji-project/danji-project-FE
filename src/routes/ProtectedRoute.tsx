import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  // localStorage에서 로그인 상태 확인
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // 로그인하지 않았으면 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
