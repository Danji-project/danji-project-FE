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
}: {
  text: string;
  usingConfirm?: boolean;
  onCancel?: () => void;
  onSend?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
  actionText?: string;
}) => {
  const { setModalPending, modalLoading } = usePendingStore();
  const { setModalText, modalTitle, modalText } = useModalTextStore();

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
      }}
    >
      {shouldShowLoading ? (
        <div className={styles["text__modal__loading"]}>
          <ModalSkeleton />
        </div>
      ) : (
        <>
          <h2>{modalTitle}</h2>
          {(text || modalText) && (
            <p className={styles["text__modal__confirm__text"]}>
              {text || modalText}
            </p>
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
              <button type="button" onClick={onSend}>
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
