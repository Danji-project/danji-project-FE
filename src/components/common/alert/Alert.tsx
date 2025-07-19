import React, { type Dispatch, type SetStateAction } from "react";

import styles from "./Alert.module.scss";

const Alert = ({
  alertTitle,
  alertContent,
  isUsable,
  closeAlert,
  setDimmed,
}: {
  alertTitle: string;
  alertContent: string;
  isUsable?: boolean;
  closeAlert?: () => void;
  setDimmed?: Dispatch<SetStateAction<boolean>>;
}) => {
  const onCancel = () => {
    closeAlert && closeAlert();
    setDimmed && setDimmed(false);
  };

  return (
    <div className={styles["alert"]}>
      <h2>{alertTitle}</h2>
      <p>{alertContent}</p>
      <div className={styles["alert__footer"]}>
        {isUsable ? (
          <>
            <button type="button" onClick={onCancel}>
              취소
            </button>
            <button type="button">인증번호 전송</button>
          </>
        ) : (
          <>
            <button type="button">확인</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Alert;
