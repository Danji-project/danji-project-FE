import { Skeleton } from "@mui/material";
import styles from "./MyPageBoxSkeleton.module.scss";

const MyPageBoxSkeleton = () => {
  return (
    <div className={styles["my__page__box__skeleton"]}>
      {/* 프로필 이미지 스켈레톤 */}
      <div className={styles["skeleton__profile"]}>
        <Skeleton variant="circular" width={80} height={80} />
      </div>

      {/* 닉네임 스켈레톤 */}
      <div className={styles["skeleton__nickname"]}>
        <Skeleton variant="text" width={120} height={20} />
      </div>

      {/* 이메일 스켈레톤 */}
      <div className={styles["skeleton__email"]}>
        <Skeleton variant="text" width="80%" height={14} />
      </div>

      {/* 단지 정보 스켈레톤 */}
      <div className={styles["skeleton__danji"]}>
        <div className={styles["skeleton__danji__box"]}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </div>
        <div className={styles["skeleton__danji__button"]}>
          <Skeleton variant="rounded" width="100%" height={44} />
        </div>
      </div>
    </div>
  );
};

export default MyPageBoxSkeleton;
