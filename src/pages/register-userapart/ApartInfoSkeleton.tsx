import { Skeleton } from "@mui/material";
import styles from "./ApartInfoSkeleton.module.scss";

const ApartInfoSkeleton = () => {
  return (
    <div className={styles["apart__info__skeleton"]}>
      <Skeleton
        variant="rectangular"
        width={70}
        height={70}
        style={{ borderRadius: "4px" }}
      />
      <div className={styles["apart__skeleton__wrapper"]}>
        <Skeleton variant="text" width={200} sx={{ fontSize: "14px" }} />
        <Skeleton variant="text" width={200} sx={{ fontSize: "14px" }} />
        <Skeleton variant="text" width={200} sx={{ fontSize: "14px" }} />
      </div>
    </div>
  );
};

export default ApartInfoSkeleton;
