import React from "react";
import AppRoutes from "../../routes/AppRoutes";
import PreviewDevice from "./PreviewDevice";
import ServiceIntro from "./ServiceIntro";

const LandingIntro = () => {
  return (
    <div className="landing__container">
      <PreviewDevice>
        <AppRoutes />
      </PreviewDevice>
      <ServiceIntro />
    </div>
  );
};

export default LandingIntro;
