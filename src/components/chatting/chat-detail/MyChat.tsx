import React from "react";

import styles from "./MyChat.module.scss";

const MyChat = () => {
  return (
    <div className={styles["chat__mine"]}>
      <div className={styles["chat__mine__text"]}>
        안녕하세요, 김세중입니다.
      </div>
      <span className={styles["chat__mine__time"]}>15:05</span>
    </div>
  );
};

export default MyChat;
