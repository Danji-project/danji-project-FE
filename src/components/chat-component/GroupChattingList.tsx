import { useEffect, useState } from "react";
import { useChat } from "../../hooks/useChat";
import {
  useGroupChattingStore,
  type GroupChatting,
} from "../../stores/useGroupChattingStore";
import { useWebSocket } from "../../hooks/WebSocketContext";
import styles from "./DirectChattingList.module.scss";
import SentChatCardSkeleton from "./SentChatCardSkeleton";
import ChatRoom from "./ChatRoom";
import GroupChattingCard from "./GroupChattingCard";

const SKELETON_IDS = ["skeleton-1", "skeleton-2", "skeleton-3"];

const GroupChattingList = () => {
  const { unsubscribe } = useWebSocket();
  const { getGroupChattingList, getGroupChattingListPending } = useChat();
  const { data: groupChattingListData } = useGroupChattingStore();
  const [selectedChatroomId, setSelectedChatroomId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    getGroupChattingList.mutate();
  }, []);

  const handleCardClick = (chatroomId: number) => {
    setSelectedChatroomId(chatroomId);
  };

  const handleBack = () => {
    setSelectedChatroomId(null);
  };

  const handleLeave = (chatroomId: number) => {
    unsubscribe(chatroomId);
    getGroupChattingList.mutate();
  };

  if (selectedChatroomId !== null) {
    return <ChatRoom chatroomId={selectedChatroomId} onBack={handleBack} />;
  }

  return (
    <div className={styles["direct__chatting__list"]}>
      {getGroupChattingListPending ? (
        <div className={styles["direct__chatting__list__wrapper"]}>
          {SKELETON_IDS.map((id) => (
            <SentChatCardSkeleton key={id} />
          ))}
        </div>
      ) : groupChattingListData.length > 0 ? (
        <div className={styles["direct__chatting__list__wrapper"]}>
          {groupChattingListData.map((chatData: GroupChatting) => (
            <GroupChattingCard
              key={chatData.chatroomId}
              data={chatData}
              onClick={handleCardClick}
              onLeave={handleLeave}
            />
          ))}
        </div>
      ) : (
        <div className={styles["direct__chatting__list__wrapper"]}>
          <span>단체 채팅 목록이 없습니다.</span>
        </div>
      )}
    </div>
  );
};

export default GroupChattingList;
