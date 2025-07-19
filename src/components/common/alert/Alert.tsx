import React from "react";

import styles from "./Alert.module.scss";

const Alert = ({
  alertTitle,
  alertContent,
  isUsable,
  closeAlert,
}: {
  alertTitle: string;
  alertContent: string;
  isUsable?: boolean;
  closeAlert?: () => void;
}) => {
  return (
    <div className={styles["alert"]}>
      <h2>{alertTitle}</h2>
      <p>{alertContent}</p>
      <div className={styles["alert__footer"]}>
        {isUsable ? (
          <>
            <button type="button">취소</button>
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
