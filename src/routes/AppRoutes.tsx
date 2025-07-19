import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import AuthRoutes from "./AuthRoutes";
import RegisterPage from "../pages/register/RegisterPage";
import RegisterSuccessPage from "../pages/register/RegisterSuccessPage";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {/* 인증 관련 라우팅 */}
        <Route element={<AuthRoutes />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-success" element={<RegisterSuccessPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
