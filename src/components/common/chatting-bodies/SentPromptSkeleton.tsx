import { Skeleton } from "@mui/material";
import styles from "./SentPromptSkeleton.module.scss";

const SentPromptSkeleton = () => {
  return (
    <div className={styles["sent__prompt__skeleton"]}>
      <Skeleton variant="circular" width={50} height={50} />
    </div>
  );
};

export default SentPromptSkeleton;
