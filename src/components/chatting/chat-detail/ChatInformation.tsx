import React from "react";

import styles from "./ChatInformation.module.scss";
import OtherChat from "./OtherChat";
import MyChat from "./MyChat";

const ChatInformation = () => {
  return (
    <div className={styles["chat__information"]}>
      <div className={styles["chat__date"]}>2025년 2월 11일 화요일</div>
      <OtherChat />
      <MyChat />
      <OtherChat />
      <MyChat />
    </div>
  );
};

export default ChatInformation;
