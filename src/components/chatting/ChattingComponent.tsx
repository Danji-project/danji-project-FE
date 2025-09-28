import React from "react";

import { Link } from "react-router-dom";

import styles from "./ChattingComponent.module.scss";
import Profile from "../common/profile/Profile";

const ChattingComponent = () => {
  return (
    <Link to="/chat/chat-detail" className={styles.chattingEachComponent}>
      <Profile profileImage="/profile_imgSrc.jpg" />
      <div className="chat-content" style={{ marginLeft: "10px" }}>
        <div className="chat-content-top" style={{ display: "flex" }}>
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>한예빈</span>
          <span style={{ fontSize: "14px", marginLeft: "4px" }}>3분 전</span>
        </div>
        <div
          className="chat-thumbnail-text"
          style={{ marginTop: "6px", lineHeight: "1.2", fontSize: "14px" }}
        >
          저도 그런 이유로 입주를 고민하고 있었어요 <br /> 혹시 입주 예정일은
          언제쯤이세요?
        </div>
      </div>
    </Link>
  );
};

export default ChattingComponent;
