import * as React from "react";
import StatusBar from "./StatusBar";
import { useDialogStore } from "../../stores/dialogStore";
import { useAlertStore } from "../../stores/alertStore";
import useAuthCode from "../../hooks/useAuthCode";
import { useCheckEmail } from "../../hooks/useCheckEmail";

const PreviewDevice = ({ children }: { children: React.ReactNode }) => {
  const { isAuthLoading } = useAuthCode();
  const { isEmailLoading } = useCheckEmail();
  const { isOpen } = useDialogStore();
  const { isAlertOpen } = useAlertStore();

  return (
    <div
      className={`preview-device ${
        isOpen || isAlertOpen || isAuthLoading || isEmailLoading
          ? "of-hidden"
          : ""
      }`}
    >
      <div className="app-container">
        <StatusBar />
        {children}
      </div>
    </div>
  );
};

export default PreviewDevice;
