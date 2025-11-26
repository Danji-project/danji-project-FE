import { useEffect } from "react";
import { receivedList, type SentData2 } from "../../../hooks/useChat";
import { useReceivedRequest } from "../../../stores/useRequest";

import styles from "./ReceivedPrompt.module.scss";
import SentPromptSkeleton from "./SentPromptSkeleton";
import CommonRequest from "./CommonRequest";

const ReceivedPrompt = () => {
  const { receivedFunction, receivedPending } = receivedList();
  const { sentData } = useReceivedRequest();

  useEffect(() => {
    receivedFunction.mutate();
  }, []);

  return (
    <div
      className={`${styles["received__prompt"]} ${
        sentData.length === 0 && !receivedPending
          ? styles["received__prompt__none"]
          : ""
      }`}
    >
      {receivedPending ? (
        <SentPromptSkeleton />
      ) : sentData.length > 0 ? (
        sentData.map((sd: SentData2) => <CommonRequest sd={sd} isReceived />)
      ) : (
        <p>요청된 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default ReceivedPrompt;
