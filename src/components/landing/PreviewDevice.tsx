import React from "react";
import StatusBar from "./StatusBar";
import { useDialogStore } from "../../stores/dialogStore";
import { useAlertStore } from "../../stores/alertStore";
import useAuthCode from "../../hooks/useAuthCode";
import { useCheckEmail } from "../../hooks/useCheckEmail";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import Spinners from "../common/spinners/Spinners";
import { useRootPosition } from "../../hooks/useRootPosition";
import { useSidebarStore } from "../../stores/sidebarStore";
import { useRootPositionStore } from "../../stores/rootPositionStore";
import { useLogout } from "../../hooks/useLogin";
import { usePendingStore } from "../../stores/usePendingStore";

const PreviewDevice = ({ children }: { children: React.ReactNode }) => {
  const { isAuthLoading } = useAuthCode();
  const { isEmailLoading } = useCheckEmail();
  const { isOpen } = useDialogStore();
  const { isAlertOpen } = useAlertStore();
  const { isPending } = useUserInfoMutation();
  const { isPending: logoutPending } = useLogout();
  const { apartChatBlack, profilePending, modalPending } = usePendingStore();

  const rootRef = useRootPosition();

  const { isOpen: sidebarOpen } = useSidebarStore();

  const { positionTop, positionLeft } = useRootPositionStore();

  return (
    <div
      ref={rootRef}
      className={`preview-device ${
        isOpen ||
        isAlertOpen ||
        isAuthLoading ||
        isEmailLoading ||
        isPending ||
        sidebarOpen ||
        logoutPending ||
        apartChatBlack ||
        profilePending ||
        modalPending
          ? "of-hidden"
          : ""
      }`}
    >
      {(isPending || logoutPending) && (
        <div
          className="div-background-black"
          style={{
            top: `${positionTop}px`,
            left: `${positionLeft}px`,
          }}
        >
          <Spinners />
        </div>
      )}
      {(sidebarOpen || apartChatBlack || profilePending || modalPending) && (
        <div
          className="div-background-black"
          style={{
            top: `${positionTop}px`,
            left: `${positionLeft}px`,
          }}
        ></div>
      )}
      <div className="app-container">
        <StatusBar />
        {children}
      </div>
    </div>
  );
};

export default PreviewDevice;
