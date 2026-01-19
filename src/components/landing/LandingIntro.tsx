import { useState, useEffect } from "react";
import AppRoutes from "../../routes/AppRoutes";
import PreviewDevice from "./PreviewDevice";
import ServiceIntro from "./ServiceIntro";
import MobileServiceIntro from "./MobileServiceIntro";
import { useUserInfoStore } from "../../stores/userStore";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";

const LandingIntro = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { refreshUserInfo, isLogin } = useUserInfoStore();

  // userInfo 동기화 처리
  useEffect(() => {
    refreshUserInfo();
  }, []);

  // 로그인이 되어있을때만 /api/member 출력하기
  useUserInfoMutation(isLogin);

  useEffect(() => {
    const mobileResize = () => {
      if (window.innerWidth < 920) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    mobileResize();
    window.addEventListener("resize", mobileResize);

    return () => {
      window.removeEventListener("resize", mobileResize);
    };
  }, []);

  return (
    <div className={`landing__container ${isMobile ? "mobile" : ""}`}>
      <PreviewDevice>
        <AppRoutes />
      </PreviewDevice>
      <ServiceIntro />
      <MobileServiceIntro />
    </div>
  );
};

export default LandingIntro;
