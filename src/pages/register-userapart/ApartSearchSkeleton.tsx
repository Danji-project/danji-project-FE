import { Skeleton } from "@mui/material";
import styles from "./ApartSearchSkeleton.module.scss";

const ApartSearchSkeleton = () => {
  return (
    <div className={styles["skeleton__top"]}>
      <div className={styles["skeleton__wrapper"]}>
        <Skeleton variant={"rectangular"} width={60} height={60} />
        <div className={styles["skeleton__text__wrapper"]}>
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
        </div>
      </div>
      <div className={styles["skeleton__wrapper"]}>
        <Skeleton variant={"rectangular"} width={60} height={60} />
        <div className={styles["skeleton__text__wrapper"]}>
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
        </div>
      </div>
      <div className={styles["skeleton__wrapper"]}>
        <Skeleton variant={"rectangular"} width={60} height={60} />
        <div className={styles["skeleton__text__wrapper"]}>
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
          <Skeleton variant={"text"} sx={{ fontSize: "14px" }} width={200} />
        </div>
      </div>
    </div>
  );
};

export default ApartSearchSkeleton;
