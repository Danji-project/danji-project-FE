import { Skeleton } from "@mui/material";
import styles from "./CommunitySkeleton.module.scss";

export default function CommunitySkeleton() {
  return (
    <div className={styles["community__skeleton__wrapper"]}>
      <Skeleton
        variant="rectangular"
        width={100}
        sx={{ fontSize: "14px" }}
        style={{
          borderRadius: "4px",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      />
      <div className={styles["community__skeleton__content"]}>
        <Skeleton
          variant="rectangular"
          style={{ flex: "1", height: "44px", borderRadius: "4px" }}
        />
        <Skeleton
          variant="rectangular"
          style={{ width: "44px", height: "44px", borderRadius: "4px" }}
        />
      </div>
      <div className={styles["community__skeleton__info"]}>
        <Skeleton
          variant="rectangular"
          sx={{ fontSize: "12px" }}
          style={{ width: "100px", borderRadius: "4px" }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ fontSize: "12px" }}
          style={{ width: "100px", borderRadius: "4px" }}
        />
      </div>
    </div>
  );
}
