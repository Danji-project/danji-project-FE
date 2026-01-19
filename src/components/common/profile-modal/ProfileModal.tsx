import { useState } from "react";
import { usePendingStore } from "../../../stores/usePendingStore";
import styles from "./ProfileModal.module.scss";
const ProfileModal = ({ nick, img }: { nick: string; img: string }) => {
  const [isFinal, setIsFinal] = useState(false);
  const { setProfilePending } = usePendingStore();

  if (!isFinal)
    return (
      <div className={styles["profile__modal"]}>
        <div className={styles["profile__modal__profile"]}>
          <img src={img} alt="profile_img" />
        </div>
        <div className={styles["profile__modal__nickname"]}>{nick}</div>
        <div className={styles["profile__modal__button"]}>
          <button
            onClick={() => {
              setProfilePending(false);
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              setIsFinal(true);
            }}
          >
            대화신청
          </button>
        </div>
      </div>
    );
  if (isFinal)
    return (
      <div className={styles["profile__modal__final"]}>
        <div className={styles["profile__modal__final__title"]}>
          {nick}에게 대화 신청
        </div>
        <p>
          대화는 상대방이 수락하면 시작됩니다. <br />
          불편한 대화가 이어질 경우 대화가 종료될 수 있으니 <br />
          함께 편안한 대화를 나눌 수 있도록 배려해주세요.
        </p>
        <textarea placeholder="내용을 입력해주세요" />
        <div className={styles["profile__modal__final__button"]}>
          <button>요청</button>
          <button
            onClick={() => {
              setIsFinal(false);
              setProfilePending(false);
            }}
          >
            취소
          </button>
        </div>
      </div>
    );
};

export default ProfileModal;
