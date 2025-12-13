import styles from "./MenuSidebar.module.scss";
import { useNavigate } from "react-router-dom";
import { useSidebarStore } from "../../../stores/sidebarStore";
import { useLogout } from "../../../hooks/useLogout";
import { useEffect, useState } from "react";

const MenuSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useSidebarStore();
  const { logoutMutation } = useLogout();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div
      className={`${styles["menu__sidebar"]} ${
        isOpen ? styles["menu__sidebar__open"] : ""
      } ${isMobile ? styles["menu__sidebar__mobile"] : ""}`}
    >
      <button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <img src="/icons/close.svg" alt="close" />
      </button>
      <ul>
        <li>
          <button
            onClick={() => {
              navigate("/apart-info");
            }}
          >
            단지 정보
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/apart-info/community");
            }}
          >
            커뮤니티
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/notice");
            }}
          >
            공지사항
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/danji/find");
            }}
          >
            단지 즐겨찾기
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/my-page");
            }}
          >
            마이페이지
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/building-info");
            }}
          >
            시설 정보
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/chat-page");
            }}
          >
            채팅
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/visit-register");
            }}
          >
            방문차량등록
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/reservation/info");
            }}
          >
            내 예약 정보
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/apart/register");
            }}
          >
            단지 등록
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setIsOpen(false);
              logoutMutation.mutate();
            }}
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuSidebar;
