import React from "react";
import styles from "./OneChat.module.scss";
import ChattingComponent from "../ChattingComponent";

const OneChat = () => {
  return (
    <div className={styles.oneChat}>
      <ChattingComponent />
    </div>
  );
};

export default OneChat;
