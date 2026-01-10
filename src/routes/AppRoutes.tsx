import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoute";

import MainPage from "../pages/main/MainPage";
import ApartInfo from "../pages/apart-info/ApartInfo";
import CommunityWrite from "../pages/community-register/CommunityWrite";
import CommunityDetail from "../pages/community-detail/CommunityDetail";
import RegisterAccount from "../pages/register-account/RegisterAccount";
import RegisterSuccess from "../pages/register-success/RegisterSuccess";
import FindAccount from "../pages/find-account/FindAccount";
import ResetPassword from "../pages/reset-password/ResetPassword";
import ChattingPage from "../pages/chat-page/ChattingPage";
import LoginPage from "../pages/login/loginPage";
import ChattingDetail from "../pages/chat-detail/ChattingDetail";
import SearchResult from "../pages/search-result/SearchResult";
import Settings from "../pages/settings/Settings";
import MyPage from "../pages/my-pages/MyPage";
import RegisterMyApart from "../pages/register-userapart/RegisterUserApart";

const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        {/* 메인 페이지 라우팅 - 로그인 필수 아님 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/apart-info/:id" element={<ApartInfo />} />
        <Route path="/apart-info/:id/community" element={<ApartInfo />} />

        {/* 인증 관련 라우팅 - 로그인 필수 아님 */}
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-account" element={<RegisterAccount />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/find-account" element={<FindAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* 로그인 필수 라우팅 */}
        <Route
          path="/apart-info/:id/write"
          element={<ProtectedRoute element={<CommunityWrite />} />}
        />
        <Route
          path="/apart-info/:id/community-detail/:feedId"
          element={<ProtectedRoute element={<CommunityDetail />} />}
        />
        <Route
          path="/my-page"
          element={<ProtectedRoute element={<MyPage />} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<Settings />} />}
        />
        <Route
          path="/apart-setting"
          element={<ProtectedRoute element={<RegisterMyApart />} />}
        />
        <Route
          path="/chat-page"
          element={<ProtectedRoute element={<ChattingPage />} />}
        />
        <Route
          path="/chat-detail/:chatroomId"
          element={<ProtectedRoute element={<ChattingDetail />} />}
        />
        <Route
          path={"/search/result"}
          element={<ProtectedRoute element={<SearchResult />} />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
