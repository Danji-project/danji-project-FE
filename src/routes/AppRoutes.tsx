import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { MyPageRoutes } from "./MyPageRoutes";
import MainPage from "../pages/main/MainPage";
import RegisterMyApart from "../pages/register-my-apart-info/registerMyApartInfo";
import ApartInfo from "../pages/apart-info/ApartInfo";
import CommunityWrite from "../pages/community-register/CommunityWrite";
import CommunityDetail from "../pages/community-detail/CommunityDetail";
import RegisterAccount from "../pages/register-account/RegisterAccount";
import AuthRoutes from "./AuthRoutes";
import RegisterSuccess from "../pages/register-success/RegisterSuccess";
import FindAccount from "../pages/find-account/FindAccount";
import ChattingPage from "../pages/chat-page/ChattingPage";
import ResetPassword from "../pages/reset-password/ResetPassword";
import LoginPage from "../pages/login/loginPage";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {/* 메인 페이지 라우팅 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/apart-info/:id" element={<ApartInfo />} />
        <Route path="/apart-info/:id/write" element={<CommunityWrite />} />
        <Route
          path="/apart-info/:id/community-detail/:feedId"
          element={<CommunityDetail />}
        />

        {/* 인증 관련 라우팅 */}
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-account" element={<RegisterAccount />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/find-account" element={<FindAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* 마이페이지 라우팅 */}
        <Route element={<MyPageRoutes />}>
          {/*  <Route path="/my-page" element={<MyPage />} /> */}
          <Route path="/register-my-apart-info" element={<RegisterMyApart />} />
        </Route>

        {/* 채팅 라우팅 */}
        <Route path="/chat-page" element={<ChattingPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
