import { useNavigate } from "react-router-dom";
import type { BaseApartInfo } from "../../model/BaseApartInfoModel";
import { useRootPositionStore } from "../../stores/rootPositionStore";
import styles from "./ApartChatModal.module.scss";
import { usePendingStore } from "../../stores/usePendingStore";

const ApartChatModal = ({ apartData }: { apartData: BaseApartInfo }) => {
  const { positionLeft, positionTop } = useRootPositionStore();
  const { setApartChatBlack } = usePendingStore();

  return (
    <div
      className={styles["apart__chat__modal"]}
      style={{
        position: "fixed",
        left: `${positionLeft}px`,
        bottom: `${positionTop}px`,
      }}
    >
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
        <button>참여하기</button>
      </div>
    </div>
  );
};

export default ApartChatModal;
