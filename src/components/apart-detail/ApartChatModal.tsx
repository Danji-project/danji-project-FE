import { useState } from "react";
import styles from "./ApartChatModal.module.scss";
import { usePendingStore } from "../../stores/usePendingStore";
import type { BaseApartInfo } from "../../api";

const ApartChatModal = ({ apartData }: { apartData: BaseApartInfo }) => {
  const { setApartChatBlack } = usePendingStore();

  const handleJoinChat = () => {
    // 채팅방 참여 기능 제거됨
    // 모달만 닫기
    setApartChatBlack(false);
  };

  return (
    <div className={styles["modal__overlay"]} onClick={() => setApartChatBlack(false)}>
      <div className={styles["apart__chat__modal"]} onClick={(e) => e.stopPropagation()}>
        <h1>{apartData.apartDetailName}</h1>
        <p>
          단지 채팅방에 참여하여 <br />더 많은 소식을 실시간으로 받아보세요!
        </p>
        <img src="https://placehold.co/180x60" alt="placeholder" />
        <div className={styles["apart__chat__modal__buttons"]}>
          <button
            onClick={() => {
              setApartChatBlack(false);
            }}
          >
            뒤로 가기
          </button>
          <button onClick={handleJoinChat}>
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartChatModal;
