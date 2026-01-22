import { useState } from "react";
import TabList from "../../components/common/tabs/TabList";
import Header from "../../layouts/Header";

function Chatting() {
  const tabLists = [
    "Direct-Chatting/1:1 채팅",
    "Group-Chatting/단체 채팅",
    "Received/받은 요청",
    "Sent/보낸 요청",
  ];
  const [tab, setTab] = useState<string>("1:1 채팅");

  return (
    <>
      <Header title="채팅" hasBackButton />
      <TabList contents={tabLists} tabs={tab} setTabs={setTab} />
    </>
  );
}

export default Chatting;
