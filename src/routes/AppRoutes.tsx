import { Suspense, useContext, useEffect } from "react";
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
  const { isLogin } = useContext(UserContext);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* 인증 관련 라우팅 */}
        <Route element={<AuthRoutes />}>
          <Route
            path="/register"
            element={!isLogin ? <RegisterPage /> : <Navigate to="/" replace />}
          />
          <Route path="/register-success" element={<RegisterSuccessPage />} />
          <Route
            path="/login"
            element={!isLogin ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/find"
            element={!isLogin ? <FindInfoPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/find-result"
            element={
              !isLogin ? <FindResultPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/reset-password"
            element={
              !isLogin ? <ResetPasswordPage /> : <Navigate to="/" replace />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
