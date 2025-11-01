import React from "react";
import StatusBar from "./StatusBar";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import Spinners from "../common/spinners/Spinners";
import { useRootPosition } from "../../hooks/useRootPosition";
import { useSidebarStore } from "../../stores/sidebarStore";
import { useRootPositionStore } from "../../stores/rootPositionStore";
import { usePendingStore } from "../../stores/usePendingStore";

const PreviewDevice = ({ children }: { children: React.ReactNode }) => {
  const { isPending } = useUserInfoMutation();
  const {
    apartChatBlack,
    profilePending,
    modalPending,
    findPending,
    isLoginPending,
    registerDimmed,
  } = usePendingStore();

  const rootRef = useRootPosition();

  const { isOpen: sidebarOpen } = useSidebarStore();

  const { positionTop, positionLeft } = useRootPositionStore();

  return (
    <div
      ref={rootRef}
      className={`preview-device ${
        isPending ||
        sidebarOpen ||
        apartChatBlack ||
        profilePending ||
        modalPending ||
        isLoginPending ||
        registerDimmed ||
        findPending
          ? "of-hidden"
          : ""
      }`}
    >
      {(isPending || isLoginPending || findPending) && (
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
      {(sidebarOpen ||
        apartChatBlack ||
        profilePending ||
        modalPending ||
        registerDimmed) && (
        <div
          className="div-background-black-2"
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
