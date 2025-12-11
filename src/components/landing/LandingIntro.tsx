import { useState, useEffect } from "react";
import AppRoutes from "../../routes/AppRoutes";
import PreviewDevice from "./PreviewDevice";
import ServiceIntro from "./ServiceIntro";
import MobileServiceIntro from "./MobileServiceIntro";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";

const LandingIntro = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { getUserInfo } = useUserInfoMutation();

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

    // 쿠키 기반 인증이므로 항상 사용자 정보 조회 시도 (쿠키가 있으면 자동으로 전송됨)
    getUserInfo.mutate();

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
