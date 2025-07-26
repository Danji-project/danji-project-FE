import { useState, useEffect } from "react";
import AppRoutes from "../../routes/AppRoutes";
import PreviewDevice from "./PreviewDevice";
import ServiceIntro from "./ServiceIntro";
import MobileServiceIntro from "./MobileServiceIntro";

const LandingIntro = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mobileResize = () => {
      if (window.innerWidth < 960) {
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
