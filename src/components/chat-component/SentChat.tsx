import { useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import { useWebSocket } from "../../hooks/WebSocketContext";
import {
  useSentMessageStore,
  type SentMessage,
} from "../../stores/useSentMessageStore";

import styles from "./SentChat.module.scss";
import SentChatCard from "./SentChatCard";
import SentChatCardSkeleton from "./SentChatCardSkeleton";

const SKELETON_IDS = ["skeleton-1", "skeleton-2", "skeleton-3"];

const SentChat = () => {
  useWebSocket();

  const { getChatPurpose, getChatPurposePending } = useChat();
  const { data: chatPurposeData } = useSentMessageStore();

  useEffect(() => {
    getChatPurpose.mutate();
  }, []);

  return (
    <div className={styles["sent__messages"]}>
      {getChatPurposePending ? (
        <div className={styles["sent__messages__wrapper"]}>
          {SKELETON_IDS.map((id) => (
            <SentChatCardSkeleton key={id} />
          ))}
        </div>
      ) : (
        <div className={styles["sent__messages__wrapper"]}>
          {chatPurposeData.length > 0 &&
            chatPurposeData.map((purposeData: SentMessage) => (
              <SentChatCard key={purposeData.requestId} data={purposeData} />
            ))}
          {chatPurposeData.length === 0 && <span>보낸 요청이 없습니다.</span>}
        </div>
      )}
    </div>
  );
};

export default SentChat;
