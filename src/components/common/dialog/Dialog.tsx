import React from "react";

import styles from "./Dialog.module.scss";

const Dialog = () => {
  return (
    <div
      className={`${styles["dialog_overlay_frame"]}`}
      role="dialog"
      aria-modal="true"
    ></div>
  );
};

export default Dialog;
