import React from "react";
import Header from "../../../layouts/Header";
import ChatMessage from "./ChatMessage";
import ChatInformation from "./ChatInformation";
import ChatInput from "./ChatInput";

const ChatDetail = () => {
  return (
    <div>
      <Header title="한예빈" hasBackButton={true} hasExit={"나가기"} />
      <ChatMessage />
      <ChatInformation />
      <ChatInput />
    </div>
  );
};

export default ChatDetail;
