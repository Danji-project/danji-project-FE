import { useRootPosition } from "../../../hooks/useRootPosition";
import { useRootPositionStore } from "../../../stores/rootPositionStore";
import { useModalTextStore } from "../../../stores/useModalText";
import { usePendingStore } from "../../../stores/usePendingStore";
import BoxSkeleton from "../box-skeleton/BoxSkeleton";
import styles from "./TextModal.module.scss";

const TextModal = ({
  text,
  usingConfirm,
  onCancel,
  onSend,
  onConfirm,
}: {
  text: string;
  usingConfirm?: boolean;
  onCancel?: () => void;
  onSend?: () => void;
  onConfirm?: () => void;
}) => {
  useRootPosition();

  const { setModalPending } = usePendingStore();
  const { setModalText, modalTitle } = useModalTextStore();
  const { modalLoading } = usePendingStore();

  const { positionBottom, positionLeft } = useRootPositionStore();
  let content;
  if (modalLoading) {
    content = (
      <div className={styles["text__modal__loading"]}>
        <BoxSkeleton />
      </div>
    );
  } else if (text) {
    content = <p className={styles["text__modal__confirm__text"]}>{text}</p>;
  } else {
    content = <BoxSkeleton />;
  }

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
      <h2>{modalTitle}</h2>
      {content}
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
          <button type="button" onClick={onCancel} disabled={modalLoading}>
            취소
          </button>
          <button type="button" onClick={onSend} disabled={modalLoading}>
            인증번호 전송
          </button>
        </div>
      )}
    </div>
  );
};

export default TextModal;
