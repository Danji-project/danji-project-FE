import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { MyPageRoutes } from "./MyPageRoutes";

import RegisterPage from "../pages/register/RegisterPage";
import RegisterSuccessPage from "../pages/register/RegisterSuccessPage";
import { LoginPage } from "../pages/login/loginPage";
import { FindInfoPage } from "../pages/find-info/findInfoPage";
import { FindResultPage } from "../pages/find-info/findResultPage";
import { ResetPasswordPage } from "../pages/find-info/resetPasswordPage";
import { MainPage } from "../pages/main/MainPage";
import RegisterMyApart from "../pages/register-my-apart-info/registerMyApartInfo";
import DetailApartInfo from "../pages/detail-apart-info/DetailApartInfo";
import DetailFeedInfo from "../pages/detail-apart-info/DetailFeedInfo";

import MyPage from "../pages/my-pages/MyPage";
import { SettingsRoutes } from "./SettingsRoutes";
import Settings from "../pages/settings/Settings";
import ChatPage from "../pages/chat/ChatPage";
import MakeFeed from "../pages/make-feed/MakeFeed";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {/* 메인 페이지 라우팅 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/community/feed" element={<DetailFeedInfo />} />
        <Route path="/make/feed" element={<MakeFeed />} />

        {/* 인증 관련 라우팅 */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-success" element={<RegisterSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find" element={<FindInfoPage />} />
        <Route path="/find-result" element={<FindResultPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/apart-Info" element={<DetailApartInfo />} />

        {/* 마이페이지 라우팅 */}
        <Route element={<MyPageRoutes />}>
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/register-my-apart-info" element={<RegisterMyApart />} />
        </Route>

        {/* 설정 라우팅 */}
        <Route element={<SettingsRoutes />}>
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 채팅 라우팅 */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
