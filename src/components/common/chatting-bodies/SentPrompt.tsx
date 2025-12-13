import { useEffect } from "react";
import { sendList } from "../../../hooks/useChat";
import { useSendRequest } from "../../../stores/useRequest";
import styles from "./SentPrompt.module.scss";
import type { SentData2 } from "../../../hooks/useChat";
import CommonRequest from "./CommonRequest";
import SentPromptSkeleton from "./SentPromptSkeleton";

const SentPrompt = () => {
  const { sendFunction, sendPending } = sendList();

  const { sentData } = useSendRequest();

  useEffect(() => {
    sendFunction.mutate();
  }, []);

  return (
    <div
      className={`${styles["sent__prompt"]} ${
        sentData.length === 0 && !sendPending
          ? styles["sent__prompt__none"]
          : ""
      }`}
    >
      {sendPending ? (
        <SentPromptSkeleton />
      ) : sentData.length > 0 ? (
        sentData.map((sd: SentData2, idx: number) => (
          <CommonRequest key={idx} sd={sd} isSent />
        ))
      ) : (
        <p>요청된 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default SentPrompt;
