import { Skeleton } from "@mui/material";
import styles from "./InitListSkeleton.module.scss";

const InitListSkeleton = () => {
  return (
    <div className={styles["init__list__skeleton"]}>
      <Skeleton
        variant="rectangular"
        sx={{ fontSize: "16px" }}
        style={{ marginBottom: "20px" }}
        width={100}
      />
      <Skeleton
        variant="rectangular"
        sx={{ fontSize: "16px" }}
        style={{ width: "100%", height: "36px" }}
      />
    </div>
  );
};

export default InitListSkeleton;
