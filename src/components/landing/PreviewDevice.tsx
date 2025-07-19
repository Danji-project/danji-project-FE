import * as React from "react";
import StatusBar from "./StatusBar";
import { useDialogStore } from "../../stores/dialogStore";

const PreviewDevice = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useDialogStore();

  return (
    <div className={`preview-device ${isOpen ? "of-hidden" : ""}`}>
      <div className="app-container">
        <StatusBar />
        {children}
      </div>
    </div>
  );
};

export default PreviewDevice;
