import { useEffect, useState } from "react";
import { directChattingList } from "../../../hooks/useChat";
import styles from "./DirectChatting.module.scss";
import { useChatListStore, type ChatList2 } from "../../../stores/useChatList";
import DirectChattingCard from "./DirectChattingCard";

const DirectChatting = () => {
  const { directChatFunction } = directChattingList();
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
      {chatData.map((cd: ChatList2, index: number) => (
        <DirectChattingCard
          cd={cd}
          setIsSubOpen={setIsSubOpen}
          isSubOpen={isSubOpen}
          index={index}
        />
      ))}
    </div>
  );
};

export default DirectChatting;
