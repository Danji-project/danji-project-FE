import * as React from "react";
import StatusBar from "./StatusBar";
import { useDialogStore } from "../../stores/dialogStore";
import { useAlertStore } from "../../stores/alertStore";
import useAuthCode from "../../hooks/useAuthCode";
import { useCheckEmail } from "../../hooks/useCheckEmail";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import Spinners from "../common/spinners/Spinners";

const PreviewDevice = ({ children }: { children: React.ReactNode }) => {
  const { isAuthLoading } = useAuthCode();
  const { isEmailLoading } = useCheckEmail();
  const { isOpen } = useDialogStore();
  const { isAlertOpen } = useAlertStore();
  const { isPending } = useUserInfoMutation();

  return (
    <div
      className={`preview-device ${
        isOpen || isAuthLoading || isEmailLoading || isPending
          ? "of-hidden"
          : ""
      }`}
    >
      {isPending && (
        <div className="div-background-black">
          <Spinners />
        </div>
      )}
      <div className="app-container">
        <StatusBar />
        {children}
      </div>
    </div>
  );
};

export default PreviewDevice;
