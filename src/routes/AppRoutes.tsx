import { Suspense } from "react";
import { Route, Routes } from "react-router";
import AuthRoutes from "./AuthRoutes";
import RegisterPage from "../pages/register/RegisterPage";
import RegisterSuccessPage from "../pages/register/RegisterSuccessPage";
import { LoginPage } from "../pages/login/loginPage";
import { FindInfoPage } from "../pages/find-info/findInfoPage";
import { FindResultPage } from "../pages/find-info/findResultPage";
import { ResetPasswordPage } from "../pages/find-info/resetPasswordPage";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {/* 인증 관련 라우팅 */}
        <Route element={<AuthRoutes />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-success" element={<RegisterSuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/find" element={<FindInfoPage />} />
          <Route path="/find-result" element={<FindResultPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
