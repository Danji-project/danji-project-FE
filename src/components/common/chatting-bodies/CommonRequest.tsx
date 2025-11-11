import {
  approveReceived,
  cancelSend,
  type SentData2,
} from "../../../hooks/useChat";
import { getRelativeTime } from "../../../utils/date";
import styles from "./CommonRequest.module.scss";

const CommonRequest = ({
  sd,
  isSent,
  isReceived,
}: {
  sd: SentData2;
  isSent?: boolean;
  isReceived?: boolean;
}) => {
  const { cancelFunction } = cancelSend();
  const { approvedFunction } = approveReceived();

  return (
    <div className={styles["common__request"]}>
      <div className={styles["common__request__info"]}>
        <div className={styles["common__request__info__profile"]}>
          <img
            src={
              sd.memberInformation.profileUrl
                ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                  sd.memberInformation.profileUrl
                : "/profile_imgSrc.jpg"
            }
            alt="profile"
          />
        </div>
        <div className={styles["common__request__info__text"]}>
          <div className={styles["common__request__info__name"]}>
            <span>{sd.memberInformation.nickname}</span>
            <span>{getRelativeTime(sd.createdAt.split("T")[0])}</span>
          </div>
          <div className={styles["common__request__info__message"]}>
            {sd.message}
          </div>
        </div>
      </div>
      <div className={styles["common__request__button"]}>
        {isSent && (
          <>
            <button disabled>
              {sd.status === "PENDING" ? "대기중" : "완료"}
            </button>
            {sd.status === "PENDING" && (
              <button
                onClick={() => {
                  cancelFunction.mutate(sd.requestId);
                }}
              >
                취소
              </button>
            )}
          </>
        )}
        {isReceived && sd.status === "PENDING" && (
          <>
            <button>거절</button>
            <button onClick={() => approvedFunction.mutate(sd.requestId)}>
              수락
            </button>
          </>
        )}
        {isReceived && sd.status === "APPROVED" && (
          <>
            <span>수락했습니다.</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CommonRequest;
