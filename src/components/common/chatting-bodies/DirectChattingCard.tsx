import { type Dispatch, type SetStateAction } from "react";
import type { ChatList2 } from "../../../stores/useChatList";
import { getRelativeTime } from "../../../utils/date";
import styles from "./DirectChattingCard.module.scss";
import { chatDetailList } from "../../../hooks/useChat";
import { useNavigate } from "react-router-dom";

const DirectChattingCard = ({
  cd,
  setIsSubOpen,
  isSubOpen,
  index,
}: {
  cd: ChatList2;
  setIsSubOpen: Dispatch<SetStateAction<{ boolean: boolean; index: number }>>;
  isSubOpen: { boolean: boolean; index: number };
  index: number;
}) => {
  const { detailFunction } = chatDetailList();
  const navigate = useNavigate();

  return (
    <div className={styles["direct__chat__card"]}>
      <div className={styles["direct__chat__card__profile"]}>
        <img
          src={
            cd.memberInformation.profileUrl
              ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                cd.memberInformation.profileUrl
              : "/profile_imgSrc.jpg"
          }
          alt="profile"
        />
      </div>
      <div className={styles["direct__chat__card__text"]}>
        <div className={styles["direct__chat__card__time__and__name"]}>
          <span>{cd.memberInformation.nickname}</span>
          <span>{getRelativeTime(cd.messageCreatedAt.split("T")[0])}</span>
        </div>
        <div className={styles["direct__chat__card__message"]}>
          {cd.chatMessage}
        </div>
      </div>
      <div className={styles["direct__chat__card__dots"]}>
        <button
          onClick={() => {
            setIsSubOpen({ boolean: true, index });
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {isSubOpen.boolean && isSubOpen.index === index && (
          <div className={styles["direct__chat__card__dots__sub"]}>
            <button
              onClick={() => {
                detailFunction.mutate(cd.chatroomId);
                navigate(`/chat-detail/${cd.chatroomId}`);
              }}
            >
              입장하기
            </button>
            <button>나가기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectChattingCard;
