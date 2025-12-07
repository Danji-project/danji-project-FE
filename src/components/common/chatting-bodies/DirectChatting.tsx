import { useEffect, useState } from "react";
import { directChattingList } from "../../../hooks/useChat";
import styles from "./DirectChatting.module.scss";
import { useChatListStore, type ChatList2 } from "../../../stores/useChatList";
import DirectChattingCard from "./DirectChattingCard";
import ChattingSkeleton from "./ChattingSkeleton";

const DirectChatting = () => {
  const { directChatFunction, directChatPending } = directChattingList();
  const { chatData } = useChatListStore();
  const [isSubOpen, setIsSubOpen] = useState({
    boolean: false,
    index: 0,
  });

  useEffect(() => {
    directChatFunction.mutate();
  }, []);

  return (
    <div className={styles["direct__chatting"]}>
      {/* debug pending */}
      {/* eslint-disable-next-line no-console */}
      {console.debug("directChatPending:", directChatPending)}
      {directChatPending ? (
        <ChattingSkeleton />
      ) : (
        chatData.map((cd: ChatList2, index: number) => (
          <DirectChattingCard
            key={cd.chatroomId ?? index}
            cd={cd}
            setIsSubOpen={setIsSubOpen}
            isSubOpen={isSubOpen}
            index={index}
          />
        ))
      )}
    </div>
  );
};

export default DirectChatting;
