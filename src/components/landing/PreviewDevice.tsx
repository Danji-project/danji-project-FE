import { useState, useEffect, useRef } from "react";
import StatusBar from "./StatusBar";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import { useSidebarStore } from "../../stores/sidebarStore";
import { usePendingStore } from "../../stores/usePendingStore";
import { useUserInfoStore } from "../../stores/userStore";
import SyncLoader from "react-spinners/SyncLoader";
import { useRefPositioning } from "../../hooks/useRefPositioning";

const PreviewDevice = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useUserInfoStore();
  const { isLoading } = useUserInfoMutation(isLogin);
  const {
    apartChatBlack,
    profilePending,
    modalPending,
    findPending,
    isLoginPending,
    registerDimmed,
  } = usePendingStore();

  const { isOpen: sidebarOpen } = useSidebarStore();
  const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useRefPositioning(previewRef);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 920);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div
      ref={previewRef}
      className={`preview-device ${isLoading ||
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
      {(isLoading || isLoginPending || findPending) && (
        <div className="div-background-black">
          <SyncLoader color="#fff" />
        </div>
      )}
      {(sidebarOpen ||
        apartChatBlack ||
        profilePending ||
        modalPending ||
        registerDimmed) && (
          <div
            className={`div-background-black-2 ${isMobile ? "mobile-background-black-2" : ""
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
