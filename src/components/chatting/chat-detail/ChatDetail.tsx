import React from "react";
import Header from "../../../layouts/Header";
import ChatMessage from "./ChatMessage";
import ChatInformation from "./ChatInformation";

const ChatDetail = () => {
  return (
    <div>
      <Header title="한예빈" hasBackButton={true} hasExit={"나가기"} />
      <ChatMessage />
      <ChatInformation />
    </div>
  );
};

export default ChatDetail;
