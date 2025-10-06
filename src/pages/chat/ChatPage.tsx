import { useState } from "react";
import Header from "../../layouts/Header";
import TabsList from "../../components/common/tabs/TabsList";
import OneChat from "../../components/chatting/one-chat/OneChat";
import useChat from "../../hooks/useChat";

const ChatPage = () => {
  const [tabs, setTabs] = useState("oneChat");

  useChat();

  return (
    <>
      <Header title="채팅" hasBackButton={true} />
      <TabsList
        content={[
          "1:1채팅/oneChat",
          "단체 채팅/groupChat",
          "받은 요청/received",
          "보낸 요청/send",
        ]}
        tabs={tabs}
        setTabs={setTabs}
      />
      {tabs === "oneChat" && <OneChat />}
    </>
  );
};

export default ChatPage;
