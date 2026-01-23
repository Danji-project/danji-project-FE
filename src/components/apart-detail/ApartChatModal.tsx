import styles from "./ApartChatModal.module.scss";
import { usePendingStore } from "../../stores/usePendingStore";
import { useNavigate } from "react-router";
import { useWebSocket } from "../../hooks/WebSocketContext";

interface ApartChatModalProps {
  apartData: {
    apartDetailName: string;
    chatroomId?: number | null;
  };
}

const ApartChatModal = ({ apartData }: ApartChatModalProps) => {
  const { setApartChatBlack } = usePendingStore();
  const navigate = useNavigate();
  const { subscribeRooms } = useWebSocket();

  return (
    <div
      className={styles["modal__overlay"]}
      onClick={() => setApartChatBlack(false)}
    >
      <div
        className={styles["apart__chat__modal"]}
        onClick={(e) => e.stopPropagation()}
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
          <button
            onClick={() => {
              if (!apartData.chatroomId) return;
              setApartChatBlack(false);
              subscribeRooms([apartData.chatroomId]);
              navigate(`/chatting`);
            }}
          >
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartChatModal;
