import { useRootPosition } from "../../../hooks/useRootPosition";
import { useRootPositionStore } from "../../../stores/rootPositionStore";
import { useModalTextStore } from "../../../stores/useModalText";
import { usePendingStore } from "../../../stores/usePendingStore";
import styles from "./TextModal.module.scss";

const TextModal = ({
  text,
  usingConfirm,
  onCancel,
  onSend,
}: {
  text: string;
  usingConfirm?: boolean;
  onCancel?: () => void;
  onSend?: () => void;
}) => {
  useRootPosition();

  const { setModalPending } = usePendingStore();
  const { setModalText } = useModalTextStore();

  const { positionBottom, positionLeft } = useRootPositionStore();

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
      {usingConfirm && <h2>중복확인</h2>}
      <p className={usingConfirm ? styles["text__modal__confirm__text"] : ""}>
        {text}
      </p>
      {!usingConfirm && (
        <button
          onClick={() => {
            setModalPending(false);
            setModalText("");
          }}
        >
          확인
        </button>
      )}
      {usingConfirm && (
        <div className={styles["text__modal__flex__button"]}>
          <button type="button" onClick={onCancel}>
            취소
          </button>
          <button type="button" onClick={onSend}>
            인증번호 전송
          </button>
        </div>
      )}
    </div>
  );
};

export default TextModal;
