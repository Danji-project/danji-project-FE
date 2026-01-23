import type { DirectChatting } from "../../stores/useDirectChattingStore";
import { timeAgo } from "../../utils/timeAgo";
import styles from "./DirectChattingCard.module.scss";

interface DirectChattingCardProps {
  data: DirectChatting;
  onClick: (chatroomId: number) => void;
  onLeave: (chatroomId: number) => void;
}

const DirectChattingCard = ({
  data,
  onClick,
  onLeave,
}: DirectChattingCardProps) => {
  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLeave(data.chatroomId);
  };

  return (
    <div
      className={styles["direct__chatting__card"]}
      onClick={() => onClick(data.chatroomId)}
      onKeyDown={(e) => e.key === "Enter" && onClick(data.chatroomId)}
      role="button"
      tabIndex={0}
    >
      <div className={styles["direct__chatting__card__profile"]}>
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
      <div className={styles["direct__chatting__card__info"]}>
        <div className={styles["direct__chatting__card__header"]}>
          <span className={styles["direct__chatting__card__nickname"]}>
            {data.memberInformation.nickname}
          </span>
          <span className={styles["direct__chatting__card__time"]}>
            {timeAgo(data.messageCreatedAt)}
          </span>
        </div>
        <div className={styles["direct__chatting__card__message"]}>
          {data.chatMessage}
        </div>
      </div>
      <button
        className={styles["direct__chatting__card__leave"]}
        onClick={handleLeave}
      >
        나가기
      </button>
    </div>
  );
};

export default DirectChattingCard;
