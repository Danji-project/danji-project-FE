import React, { type Dispatch, type SetStateAction } from "react";

import styles from "./MenuSidebar.module.scss";
import { useRootPositionStore } from "../../../stores/rootPositionStore";
import { Link } from "react-router-dom";
import { useSidebarStore } from "../../../stores/sidebarStore";
import { useLogout } from "../../../hooks/useLogin";

const MenuSidebar = () => {
  const { positionLeft, positionTop } = useRootPositionStore();

  const { Logout } = useLogout();

  const { setIsOpen } = useSidebarStore();

  return (
    <div
      className={styles["menu__sidebar"]}
      style={{ top: `${positionTop}px`, left: `${positionLeft}px` }}
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
          <Link to="/apart-info">단지 정보</Link>
        </li>
        <li>
          <Link to="/apart-info/community">커뮤니티</Link>
        </li>
        <li>
          <Link to="/notice">공지사항</Link>
        </li>
        <li>
          <Link to="/danji/find">단지 즐겨찾기</Link>
        </li>
        <li>
          <Link to="/my-page">마이페이지</Link>
        </li>
        <li>
          <Link to="/building-info">시설 정보</Link>
        </li>
        <li>
          <Link to="/chat">채팅</Link>
        </li>
        <li>
          <Link to="/visit-register">방문차량등록</Link>
        </li>
        <li>
          <Link to="/reservation/info">내 예약 정보</Link>
        </li>
        <li>
          <Link to="/apart/register">단지 등록</Link>
        </li>
        <li>
          <button
            onClick={() => {
              Logout();
              setIsOpen(false);
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
