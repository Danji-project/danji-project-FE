import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import { MyPageRoutes } from "./MyPageRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

import RegisterPage from "../pages/register/RegisterPage";
import RegisterSuccessPage from "../pages/register/RegisterSuccessPage";
import { LoginPage } from "../pages/login/loginPage";
import { FindInfoPage } from "../pages/find-info/findInfoPage";
import { FindResultPage } from "../pages/find-info/findResultPage";
import { ResetPasswordPage } from "../pages/find-info/resetPasswordPage";
import { MainPage } from "../pages/main/MainPage";

import MyPage from "../pages/my-pages/MyPage";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {/* 메인 페이지 라우팅 */}
        <Route path="/" element={<MainPage />} />

        {/* 인증 관련 라우팅 */}
        <Route element={<AuthRoutes />}>
          <Route
            path="/register"
            element={
              <ProtectedRoutes redirectPath="/">
                <RegisterPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/register-success"
            element={
              <ProtectedRoutes redirectPath="/">
                <RegisterSuccessPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoutes redirectPath="/">
                <LoginPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/find"
            element={
              <ProtectedRoutes redirectPath="/">
                <FindInfoPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/find-result"
            element={
              <ProtectedRoutes redirectPath="/">
                <FindResultPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoutes redirectPath="/">
                <ResetPasswordPage />
              </ProtectedRoutes>
            }
          />
        </Route>

        {/* 마이페이지 라우팅 */}
        <Route element={<MyPageRoutes />}>
          <Route path="/my-page" element={<MyPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
