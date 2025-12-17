import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";

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
        {/* 메인 페이지 라우팅 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/apart-info/:id" element={<ApartInfo />} />
        <Route path="/apart-info/:id/community" element={<ApartInfo />} />
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
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/apart-setting" element={<RegisterMyApart/>}/>

        {/* 채팅 라우팅 */}
        <Route path="/chat-page" element={<ChattingPage />} />
        <Route path="/chat-detail/:chatroomId" element={<ChattingDetail />} />

        {/* 검색 라우팅 */}
        <Route path={"/search/result"} element={<SearchResult />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
