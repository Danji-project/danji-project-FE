import { useEffect, useState } from "react";
import { useChat } from "../../hooks/useChat";
import {
  useDirectChattingStore,
  type DirectChatting,
} from "../../stores/useDirectChattingStore";
import { useWebSocket } from "../../hooks/WebSocketContext";
import styles from "./DirectChattingList.module.scss";
import DirectChattingCard from "./DirectChattingCard";
import SentChatCardSkeleton from "./SentChatCardSkeleton";
import ChatRoom from "./ChatRoom";

const SKELETON_IDS = ["skeleton-1", "skeleton-2", "skeleton-3"];

const DirectChattingList = () => {
  const { unsubscribe } = useWebSocket();

  const { getDirectChattingList, getDirectChattingListPending } = useChat();
  const { data: directChattingListData } = useDirectChattingStore();
  const [selectedChatroomId, setSelectedChatroomId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    getDirectChattingList.mutate();
  }, []);

  console.log(directChattingListData);

  const handleCardClick = (chatroomId: number) => {
    setSelectedChatroomId(chatroomId);
  };

  const handleLeave = (chatroomId: number) => {
    unsubscribe(chatroomId);
    getDirectChattingList.mutate();
  };

  const handleBack = () => {
    setSelectedChatroomId(null);
  };

  if (selectedChatroomId !== null) {
    return <ChatRoom chatroomId={selectedChatroomId} onBack={handleBack} />;
  }

  return (
    <div className={styles["direct__chatting__list"]}>
      {getDirectChattingListPending ? (
        <div className={styles["direct__chatting__list__wrapper"]}>
          {SKELETON_IDS.map((id) => (
            <SentChatCardSkeleton key={id} />
          ))}
        </div>
      ) : directChattingListData.length > 0 ? (
        <div className={styles["direct__chatting__list__wrapper"]}>
          {directChattingListData.map((chatData: DirectChatting) => (
            <DirectChattingCard
              key={chatData.chatroomId}
              data={chatData}
              onClick={handleCardClick}
              onLeave={handleLeave}
            />
          ))}
        </div>
      ) : (
        <div className={styles["direct__chatting__list__wrapper"]}>
          <span>1:1 채팅 목록이 없습니다.</span>
        </div>
      )}
    </div>
  );
};

export default DirectChattingList;
