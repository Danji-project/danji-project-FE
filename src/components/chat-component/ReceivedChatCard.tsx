import { useChat } from "../../hooks/useChat";
import type { ReceivedMessage } from "../../stores/useReceivedMessageStore";
import { timeAgo } from "../../utils/timeAgo";
import styles from "./ReceivedChatCard.module.scss";

const ReceivedChatCard = ({ data }: { data: ReceivedMessage }) => {
  const { approveChatRequest, rejectChatRequest } = useChat();

  return (
    <div className={styles["received__chat__card"]}>
      <div className={styles["received__chat__card__info"]}>
        <div className={styles["received__chat__card__profile"]}>
          <img
            src={
              data.memberInformation.profileUrl
                ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                  data.memberInformation.profileUrl
                : "/profile_imgSrc.jpg"
            }
            alt="profile"
          />
        </div>
        <div className={styles["received__chat__card__information"]}>
          <div className={styles["received__chat__card__nickname"]}>
            <span>{data.memberInformation.nickname}</span>
            <span>{timeAgo(data.createdAt)}</span>
          </div>
          <div className={styles["received__chat__card__message"]}>
            {data.message}
          </div>
        </div>
      </div>
      <div className={styles["received__chat__card__buttons"]}>
        <button>{data.status === "PENDING" ? "대기중" : "승인됨"}</button>
        {data.status === "PENDING" && (
          <>
            <button
              onClick={() => {
                approveChatRequest.mutate({ requestId: data.requestId });
              }}
            >
              승인
            </button>
            <button
              onClick={() => {
                rejectChatRequest.mutate({ requestId: data.requestId });
              }}
            >
              거절
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReceivedChatCard;
