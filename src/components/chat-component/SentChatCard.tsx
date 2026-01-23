import { useChat } from "../../hooks/useChat";
import type { SentMessage } from "../../stores/useSentMessageStore";
import { timeAgo } from "../../utils/timeAgo";
import styles from "./SentChatCard.module.scss";

const SentChatCard = ({ data }: { data: SentMessage }) => {
  const { cancelChatPurpose } = useChat();

  return (
    <div className={styles["sent__chat__card"]}>
      <div className={styles["sent__chat__card__info"]}>
        <div className={styles["sent__chat__card__profile"]}>
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
        <div className={styles["sent__chat__card__information"]}>
          <div className={styles["sent__chat__card__nickname"]}>
            <span>{data.memberInformation.nickname}</span>
            <span>{timeAgo(data.createdAt)}</span>
          </div>
          <div className={styles["sent__chat__card__message"]}>
            {data.message}
          </div>
        </div>
      </div>
      <div className={styles["sent__chat__card__buttons"]}>
        <button>{data.status === "PENDING" ? "대기중" : "승인"}</button>
        {data.status === "PENDING" && (
          <button
            onClick={() => {
              cancelChatPurpose.mutate({ requestId: data.requestId });
            }}
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
};

export default SentChatCard;
