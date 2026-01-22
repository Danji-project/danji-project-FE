import { Skeleton } from "@mui/material";
import styles from "./ApartListSkeleton.module.scss";

const ApartListSkeleton = () => {
  return (
    <div className={styles["apart__list__skeleton"]}>
      <Skeleton
        variant={"rectangular"}
        style={{
          width: "100%",
          height: "180px",
          borderRadius: "6px",
          marginBottom: "10px",
        }}
      />
      <Skeleton
        variant={"rectangular"}
        style={{ width: "100px", marginBottom: "10px" }}
        sx={{ fontSize: "16px" }}
      />
      <Skeleton
        variant={"rectangular"}
        style={{ width: "100px", marginBottom: "10px" }}
        sx={{ fontSize: "16px" }}
      />
      <Skeleton
        variant={"rectangular"}
        style={{ width: "160px" }}
        sx={{ fontSize: "16px" }}
      />
    </div>
  );
};

export default ApartListSkeleton;
