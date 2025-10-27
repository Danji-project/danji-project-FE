import { useRootPosition } from "../../../hooks/useRootPosition";
import { useRootPositionStore } from "../../../stores/rootPositionStore";
import { useModalTextStore } from "../../../stores/useModalText";
import { usePendingStore } from "../../../stores/usePendingStore";
import styles from "./TextModal.module.scss";

const TextModal = ({ text }: { text: string }) => {
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
      <p>{text}</p>
      <button
        onClick={() => {
          setModalPending(false);
          setModalText("");
        }}
      >
        확인
      </button>
    </div>
  );
};

export default TextModal;
