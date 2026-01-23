import styles from "./SentChatCardSkeleton.module.scss";

const SentChatCardSkeleton = () => {
  return (
    <div className={styles["skeleton__card"]}>
      <div className={styles["skeleton__card__info"]}>
        <div className={styles["skeleton__card__profile"]} />
        <div className={styles["skeleton__card__information"]}>
          <div className={styles["skeleton__card__nickname"]}>
            <div className={styles["skeleton__line"]} />
            <div className={styles["skeleton__line--short"]} />
          </div>
          <div className={styles["skeleton__card__message"]}>
            <div className={styles["skeleton__line--long"]} />
          </div>
        </div>
      </div>
      <div className={styles["skeleton__card__buttons"]}>
        <div className={styles["skeleton__button"]} />
        <div className={styles["skeleton__button"]} />
      </div>
    </div>
  );
};

export default SentChatCardSkeleton;
