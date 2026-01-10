import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { BaseApartInfo } from "../../model/BaseApartInfoModel";
import { useRootPositionStore } from "../../stores/rootPositionStore";
import styles from "./ApartChatModal.module.scss";
import { usePendingStore } from "../../stores/usePendingStore";
import { API_ENDPOINTS } from "../../api/endpoints";

const ApartChatModal = ({ apartData }: { apartData: BaseApartInfo }) => {
  const navigate = useNavigate();
  const { positionLeft, positionTop } = useRootPositionStore();
  const { setApartChatBlack } = usePendingStore();

  const handleJoinChat = async () => {
    try {
      // 아파트의 채팅방 ID 확인 또는 생성
      const response = await axios.get(
        `/api${API_ENDPOINTS.CHAT.GROUP_ROOMS}?apartmentId=${apartData.id}`
      );

      if (response.data && response.data.data) {
        const chatroomId =
          response.data.data.chatroomId || response.data.data.id;
        // 채팅 페이지로 이동
        navigate(`/chat-page`);
        setApartChatBlack(false);
      }
    } catch (error) {
      console.error("채팅방 참여 실패:", error);
      // 에러 처리: 모달 닫기
      setApartChatBlack(false);
    }
  };

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
        <button onClick={handleJoinChat}>참여하기</button>
      </div>
    </div>
  );
};

export default ApartChatModal;
