import * as React from "react";
import styles from "./Dialog.module.scss";

import { useDialogStore } from "../../../stores/dialogStore";

const Dialog = ({
  dialogTitle,
  content,
  confirmLabel,
  cancelLabel = "취소",
  onCancel,
}: {
  dialogTitle: string;
  content: string;
  confirmLabel: string;
  cancelLabel: string;
  onCancel: () => void;
}) => {
  const { isOpen } = useDialogStore();

  if (!isOpen) return null;

  return (
    <div className={styles["dialog__overlay"]} role="dialog" aria-modal="true">
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
            aria-labelledBy={cancelLabel}
            type="button"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            className={styles["dialog__confirm-button"]}
            aria-labelledBy={confirmLabel}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
