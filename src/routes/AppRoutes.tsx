import { Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";

import { UserContext } from "../context/UserInfoContext";

import RegisterPage from "../pages/register/RegisterPage";
import RegisterSuccessPage from "../pages/register/RegisterSuccessPage";
import { LoginPage } from "../pages/login/loginPage";
import { FindInfoPage } from "../pages/find-info/findInfoPage";
import { FindResultPage } from "../pages/find-info/findResultPage";
import { ResetPasswordPage } from "../pages/find-info/resetPasswordPage";
import { MainPage } from "../pages/main/MainPage";

const AppRoutes = () => {
  const user = useContext(UserContext);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* 인증 관련 라우팅 */}
        <Route element={<AuthRoutes />}>
          <Route
            path="/register"
            element={
              !user.isLogin ? <RegisterPage /> : <Navigate to="/" replace />
            }
          />
          <Route path="/register-success" element={<RegisterSuccessPage />} />
          <Route
            path="/login"
            element={
              !user.isLogin ? <LoginPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/find"
            element={
              !user.isLogin ? <FindInfoPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/find-result"
            element={
              !user.isLogin ? <FindResultPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/reset-password"
            element={
              !user.isLogin ? (
                <ResetPasswordPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
