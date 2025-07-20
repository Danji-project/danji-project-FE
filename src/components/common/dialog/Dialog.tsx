import * as React from "react";
import styles from "./Dialog.module.scss";

import { useDialogStore } from "../../../stores/dialogStore";

const Dialog = ({
  dialogTitle,
  content,
  confirmLabel,
  cancelLabel = "취소",
  onClose,
  onConfirm,
}: {
  dialogTitle: string;
  content: string;
  confirmLabel: string;
  cancelLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const { isOpen } = useDialogStore();

  if (!isOpen) return null;

  return (
    <div
      className={styles["dialog__overlay"]}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={styles["dialog__container"]}>
        <div className={styles["dialog__header"]}>
          <span>{dialogTitle}</span>
        </div>
        <div className={styles["dialog__body"]}>
          <p>{content}</p>
        </div>
        <div className={styles["dialog__footer"]}>
          <button
            className={styles["dialog__cancel-button"]}
            aria-label={cancelLabel}
            type="button"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            className={styles["dialog__confirm-button"]}
            aria-label={confirmLabel}
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
