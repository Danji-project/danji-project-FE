import { useState } from "react";
import styles from "./ChattingBodies.module.scss";
import DirectChatting from "./DirectChatting";
import SentPrompt from "./SentPrompt";
import ReceivedPrompt from "./ReceivedPrompt";

const ChattingBodies = () => {
  const tabs = [
    "1:1채팅/directChatting",
    "단체 채팅/groupChatting",
    "받은 요청/receivedPrompt",
    "보낸 요청/sendPrompt",
  ];

  const [selectedTabs, setSelectedTabs] = useState("directChatting");

  return (
    <div className={styles["chatting__bodies"]}>
      <div className={styles["chatting__bodies__tabs"]}>
        {tabs.map((ta: string) => (
          <button
            className={selectedTabs === ta.split("/")[1] ? styles["on"] : ""}
            onClick={() => {
              setSelectedTabs(ta.split("/")[1]);
            }}
          >
            {ta.split("/")[0]}
          </button>
        ))}
      </div>
      <div className={styles["chatting__bodies__main"]}>
        {selectedTabs === "directChatting" && <DirectChatting />}
        {selectedTabs === "receivedPrompt" && <ReceivedPrompt />}
        {selectedTabs === "sendPrompt" && <SentPrompt />}
      </div>
    </div>
  );
};

export default ChattingBodies;
