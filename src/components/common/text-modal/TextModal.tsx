import { useModalTextStore } from "../../../stores/useModalText";
import { usePendingStore } from "../../../stores/usePendingStore";
import { usePositionStore } from "../../../stores/usePositionStore";
import ModalSkeleton from "../ModalSkeleton";
import styles from "./TextModal.module.scss";

const TextModal = ({
  text,
  usingConfirm,
  onCancel,
  onSend,
  onConfirm,
  isLoading,
  actionText,
  isProfile,
  isConver,
  textareaContent,
  textareaChange,
}: {
  text?: string;
  usingConfirm?: boolean;
  onCancel?: () => void;
  onSend?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
  actionText?: string;
  isProfile?: boolean;
  isConver?: boolean;
  textareaContent?: string;
  textareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  const { setModalPending, modalLoading } = usePendingStore();
  const { setModalText, modalTitle, modalText, profileImage, profileNickname } =
    useModalTextStore();

  const shouldShowLoading = isLoading || modalLoading;

  const { positionXStart, positionXEnd, positionYStart, positionYEnd } =
    usePositionStore();

  return (
    <div
      className={styles["text__modal"]}
      style={{
        position: "fixed",
        left: `${(positionXStart! + positionXEnd!) / 2}px`,
        top: `${(positionYStart! + positionYEnd!) / 2}px`,
        transform: "translate(-50%, -50%)",
        height: isConver ? "500px" : "auto",
      }}
    >
      {shouldShowLoading ? (
        <div className={styles["text__modal__loading"]}>
          <ModalSkeleton />
        </div>
      ) : (
        <>
          {isProfile ? (
            <div className={styles["profile__modal"]}>
              <div className={styles["profile__modal__profile"]}>
                <img src={profileImage} alt="modal-profile" />
              </div>
              <span>{profileNickname}</span>
            </div>
          ) : isConver ? (
            <>
              <h2>{profileNickname}에게 대화신청</h2>
              <p className={styles["message"]}>
                대화는 상대방이 수락하면 시작됩니다. <br />
                불편한 대화가 이어질 경우, 대화를 종료할 수 있으니 <br />
                함께 편안한 대화를 나눌 수 있도록 배려해주세요
              </p>
              <textarea
                placeholder="내용을 입력해주세요"
                value={textareaContent}
                onChange={textareaChange}
              />
            </>
          ) : (
            <>
              <h2>{modalTitle}</h2>
              {(text || modalText) && (
                <p className={styles["text__modal__confirm__text"]}>
                  {text || modalText}
                </p>
              )}
            </>
          )}
          {usingConfirm && (
            <button
              onClick={() => {
                setModalPending(false);
                setModalText("");
                if (onConfirm) onConfirm();
              }}
            >
              확인
            </button>
          )}
          {!usingConfirm && (
            <div className={styles["text__modal__flex__button"]}>
              <button type="button" onClick={onCancel}>
                취소
              </button>
              <button
                type="button"
                onClick={onSend}
                disabled={isConver ? !textareaContent : false}
              >
                {actionText || "인증번호 전송"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TextModal;
