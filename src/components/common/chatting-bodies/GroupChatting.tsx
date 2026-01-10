import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../api/endpoints";
import styles from "./GroupChatting.module.scss";

interface GroupChat {
  id: string;
  name: string;
  apartmentId: string;
  apartmentName: string;
  memberCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

const GroupChatting = () => {
  const navigate = useNavigate();
  const [groupChats, setGroupChats] = useState<GroupChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroupChats();
  }, []);

  const fetchGroupChats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api${API_ENDPOINTS.CHAT.GROUP_ROOMS}`);

      if (response.data && Array.isArray(response.data.data)) {
        setGroupChats(response.data.data);
      } else {
        setGroupChats([]);
      }
      setError(null);
    } catch (err) {
      console.error("단체 채팅 목록 조회 실패:", err);
      setError("단체 채팅 목록을 불러올 수 없습니다.");
      setGroupChats([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = (roomId: string) => {
    // 채팅방 상세 페이지로 이동
    navigate(`/chat-detail/${roomId}`);
  };

  if (loading) {
    return <div className={styles["group__chatting"]}>로딩 중...</div>;
  }

  if (error) {
    return (
      <div className={styles["group__chatting"]}>
        <div className={styles["error__message"]}>{error}</div>
      </div>
    );
  }

  if (groupChats.length === 0) {
    return (
      <div className={styles["group__chatting"]}>
        <div className={styles["empty__state"]}>
          <p>참여한 단체 채팅이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["group__chatting"]}>
      <div className={styles["group__chatting__list"]}>
        {groupChats.map((chat) => (
          <div
            key={chat.id}
            className={styles["group__chatting__item"]}
            onClick={() => handleChatClick(chat.id)}
          >
            <div className={styles["chatting__info"]}>
              <h3>{chat.apartmentName}</h3>
              <p className={styles["member__count"]}>
                {chat.memberCount}명 참여 중
              </p>
              {chat.lastMessage && (
                <p className={styles["last__message"]}>{chat.lastMessage}</p>
              )}
            </div>
            {chat.lastMessageTime && (
              <span className={styles["time"]}>{chat.lastMessageTime}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupChatting;
