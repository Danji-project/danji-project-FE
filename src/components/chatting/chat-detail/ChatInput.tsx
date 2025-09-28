import React from "react";

import styles from "./ChatInput.module.scss";

const ChatInput = () => {
  return (
    <div className={styles["chat__input"]}>
      <input
        type="text"
        placeholder="메시지를 입력해주세요."
        className={styles["chat__input__box"]}
      />
      <button type="submit">
        <img src="/icons/chat.png" />
      </button>
    </div>
  );
};

export default ChatInput;
