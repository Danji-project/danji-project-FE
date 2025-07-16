import React from "react";
import AppRoutes from "../../routes/AppRoutes";
import PreviewDevice from "./PreviewDevice";

const LandingIntro = () => {
  return (
    <div className="landing__container">
      <PreviewDevice>
        <AppRoutes />
      </PreviewDevice>
    </div>
  );
};

export default LandingIntro;
