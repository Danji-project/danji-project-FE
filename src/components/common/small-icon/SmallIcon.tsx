import React from "react";

import styles from "./SmallIcon.module.scss";

const SmallIcon = ({
  iconSrc,
  number,
}: {
  iconSrc: string;
  number: number;
}) => {
  return (
    <div className={styles["small__icon"]}>
      <img src={iconSrc} alt="icon" />
      <span>{number}</span>
    </div>
  );
};

export default SmallIcon;
