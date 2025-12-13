import { useState, useEffect, useRef } from "react";
import StatusBar from "./StatusBar";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import Spinners from "../common/spinners/Spinners";
import { useSidebarStore } from "../../stores/sidebarStore";
import { usePendingStore } from "../../stores/usePendingStore";
import { useRootPositionStore } from "../../stores/rootPositionStore";

const PreviewDevice = ({ children }: { children: React.ReactNode }) => {
  const { userInfoPending } = useUserInfoMutation();
  const {
    apartChatBlack,
    profilePending,
    modalPending,
    findPending,
    isLoginPending,
    registerDimmed,
  } = usePendingStore();

  const { isOpen: sidebarOpen } = useSidebarStore();
  const { setPositionTop, setPositionLeft } = useRootPositionStore();
  const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 920);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (previewRef.current) {
        const rect = previewRef.current.getBoundingClientRect();
        setPositionTop(rect.top + rect.height / 2);
        setPositionLeft(rect.left + rect.width / 2);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [setPositionTop, setPositionLeft]);

  return (
    <div
      ref={previewRef}
      className={`preview-device ${
        userInfoPending ||
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
      {(userInfoPending || isLoginPending || findPending) && (
        <div className="div-background-black">
          <Spinners />
        </div>
      )}
      {(sidebarOpen ||
        apartChatBlack ||
        profilePending ||
        modalPending ||
        registerDimmed) && (
        <div
          className={`div-background-black-2 ${
            isMobile ? "mobile-background-black-2" : ""
          }`}
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
