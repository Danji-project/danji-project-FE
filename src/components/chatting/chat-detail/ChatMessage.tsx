import React from "react";

import styles from "./ChatMessage.module.scss";

const ChatMessage = () => {
  return (
    <div className={styles["chat__message"]}>
      대화는 상대방이 수락하면 시작됩니다. <br />
      불편한 대화가 이어질 경우, 언제든지 대화를 종료할 수 있으니 <br />
      함께 편안한 대화를 나눌 수 있도록 배려해주세요.
    </div>
  );
};

export default ChatMessage;
