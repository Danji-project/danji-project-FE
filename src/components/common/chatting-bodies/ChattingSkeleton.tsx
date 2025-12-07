/* eslint-disable react/no-array-index-key */
import styles from "./ChattingSkeleton.module.scss";

const ChattingSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className={styles["chatting__skeleton"]}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          className={styles["chatting__skeleton__card"]}
          key={`skeleton-${i}`}
        >
          <div className={styles["avatar"]} />
          <div className={styles["body"]}>
            <div className={styles["line__top"]} />
            <div className={styles["line__middle"]} />
            <div className={styles["line__bottom"]} />
          </div>
          <div className={styles["dots"]} />
        </div>
      ))}
    </div>
  );
};

export default ChattingSkeleton;
