import * as React from "react";

import styles from "./Alert.module.scss";

interface AlertProps {
  alertTitle: React.ReactNode;
  alertContent: React.ReactNode;
  onClose: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  alertTitle,
  alertContent,
  confirmLabel,
  onConfirm,
}) => {
  return (
    <div
      role="alertdialog"
      aria-labelledby="alert__title"
      aria-describedby="alert__content"
      className={styles["alert__overlay"]}
    >
      <div
        className={styles["alert__container"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles["alert__header"]}>
          <h2>{alertTitle}</h2>
        </div>
        <div className={styles["alert__body"]} id="alert__content">
          <p
            dangerouslySetInnerHTML={{ __html: alertContent as string }}
            className={styles["alert__content"]}
          />
        </div>
        <div className={styles["alert__footer"]}>
          <button type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
