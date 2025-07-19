import React from "react";
import StatusBar from "./StatusBar";

const PreviewDevice = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="preview-device">
      <div className="app-container">
        <StatusBar />
        {children}
      </div>
    </div>
  );
};

export default PreviewDevice;
