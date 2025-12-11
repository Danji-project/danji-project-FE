import { useRootPosition } from "../../../hooks/useRootPosition";
import { useRootPositionStore } from "../../../stores/rootPositionStore";
import { useModalTextStore } from "../../../stores/useModalText";
import { usePendingStore } from "../../../stores/usePendingStore";
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
  useRootPosition();

  const { setModalPending, modalLoading } = usePendingStore();
  const { setModalText, modalTitle, modalText } = useModalTextStore();

  const { positionBottom, positionLeft } = useRootPositionStore();

  const shouldShowLoading = isLoading || modalLoading;

  return (
    <div
      className={styles["text__modal"]}
      style={{
        top: `${positionBottom}px`,
        left: `${positionLeft}px`,
        transform: `translateY(calc(-100% - (var(--device-height) - 100%) / 2))`,
        marginLeft: `calc((var(--device-width) - 300px) / 2)`,
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
