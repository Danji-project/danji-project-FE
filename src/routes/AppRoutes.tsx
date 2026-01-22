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
import LoginPage from "../pages/login/loginPage";
import Settings from "../pages/settings/Settings";
import MyPage from "../pages/my-pages/MyPage";
import RegisterMyApart from "../pages/register-userapart/RegisterUserApart";
import RegisterApart from "../pages/register-userapart/RegisterApart";
import Chatting from "../pages/chatting/Chatting";
import SearchInit from "../pages/search-init/SearchInit";
import SearchResult from "../pages/search-result/SearchResult";

const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        {/* 메인 페이지 라우팅 - 로그인 필수 아님 */}
        <Route path="/" element={<MainPage />} />
        <Route
          path="/apart-info/:id"
          element={<ProtectedRoute element={<ApartInfo />} />}
        />
        <Route path="/apart-info/my-apart" element={<ApartInfo />} />
        <Route
          path="/apart-info/:id/community"
          element={<ProtectedRoute element={<ApartInfo />} />}
        />
        <Route path="/search/search-init" element={<SearchInit />} />
        <Route path="/search/result" element={<SearchResult />} />

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
          path="/apart-info/:id/detail/:feedId"
          element={<ProtectedRoute element={<CommunityDetail />} />}
        />
        <Route
          path="/my-page"
          element={<ProtectedRoute element={<MyPage />} />}
        />
        <Route
          path="/chatting"
          element={<ProtectedRoute element={<Chatting />} />}
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
          path="/apart-register"
          element={<ProtectedRoute element={<RegisterApart />} />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
