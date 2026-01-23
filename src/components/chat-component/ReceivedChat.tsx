import { useEffect } from "react";
import {
  useReceivedMessageStore,
  type ReceivedMessage,
} from "../../stores/useReceivedMessageStore";
import { useChat } from "../../hooks/useChat";
import { useWebSocket } from "../../hooks/WebSocketContext";

import styles from "./ReceivedChat.module.scss";
import ReceivedChatCard from "./ReceivedChatCard";
import SentChatCardSkeleton from "./SentChatCardSkeleton";

const SKELETON_IDS = ["skeleton-1", "skeleton-2", "skeleton-3"];

const ReceivedChat = () => {
  useWebSocket();

  const { getChatReceived, getChatReceivedPending } = useChat();
  const { data: getReceivedData } = useReceivedMessageStore();

  useEffect(() => {
    getChatReceived.mutate();
  }, []);

  return (
    <div className={styles["received__messages"]}>
      {getChatReceivedPending ? (
        <div className={styles["received__messages__wrapper"]}>
          {SKELETON_IDS.map((id) => (
            <SentChatCardSkeleton key={id} />
          ))}
        </div>
      ) : (
        <div className={styles["received__messages__wrapper"]}>
          {getReceivedData.length > 0 &&
            getReceivedData.map((receivedData: ReceivedMessage) => (
              <ReceivedChatCard key={receivedData.requestId} data={receivedData} />
            ))}
          {getReceivedData.length === 0 && <span>받은 요청이 없습니다.</span>}
        </div>
      )}
    </div>
  );
};

export default ReceivedChat;
