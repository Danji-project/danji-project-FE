import { useModalTextStore } from "../../../stores/useModalText";
import { usePendingStore } from "../../../stores/usePendingStore";
import { useRootPositionStore } from "../../../stores/rootPositionStore";
import ModalSkeleton from "../ModalSkeleton";
import styles from "./TextModal.module.scss";

const TextModal = ({
  text,
  usingConfirm,
  onCancel,
  onSend,
  onConfirm,
  isLoading,
}: {
  text: string;
  usingConfirm?: boolean;
  onCancel?: () => void;
  onSend?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}) => {
  const { setModalPending, modalLoading } = usePendingStore();
  const { setModalText, modalTitle, modalText } = useModalTextStore();
  const { positionTop, positionLeft } = useRootPositionStore();

  const shouldShowLoading = isLoading || modalLoading;

  return (
    <div
      className={styles["text__modal"]}
      style={{
        top: `${positionTop}px`,
        left: `${positionLeft}px`,
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
                인증번호 전송
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TextModal;
