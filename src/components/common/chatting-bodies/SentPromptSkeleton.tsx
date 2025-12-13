import { Skeleton } from "@mui/material";
import styles from "./SentPromptSkeleton.module.scss";

const SentPromptSkeleton = () => {
  return (
    <div className={styles["sent__prompt__skeleton"]}>
      {[1, 2, 3].map((idx: number) => (
        <div key={idx} className={styles["skeleton__item"]}>
          <div className={styles["skeleton__profile"]}>
            <Skeleton variant="circular" width={50} height={50} />
          </div>
          <div className={styles["skeleton__content"]}>
            <div className={styles["skeleton__header"]}>
              <Skeleton variant="text" width={100} height={16} />
              <Skeleton variant="text" width={60} height={14} />
            </div>
            <Skeleton variant="text" width="90%" height={15} />
          </div>
          <div className={styles["skeleton__buttons"]}>
            <Skeleton variant="rounded" width={60} height={32} />
            <Skeleton variant="rounded" width={50} height={32} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SentPromptSkeleton;
