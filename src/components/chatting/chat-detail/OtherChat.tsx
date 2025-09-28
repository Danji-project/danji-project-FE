import React from "react";

import styles from "./OtherChat.module.scss";
import Profile from "../../common/profile/Profile";

const OtherChat = () => {
  return (
    <div className={styles["chat__other"]}>
      <Profile profileImage="/profile_imgSrc.jpg" />
      <div className={styles["chat__other__text"]}>
        아파트 관련해서 정보 좀 얻고자 연락드렸어요. 혹시 아파트 도서관 사용을
        위해 정액권을 끊어야 하나요?
      </div>
      <span className={styles["chat__other__time"]}>17:05</span>
    </div>
  );
};

export default OtherChat;
