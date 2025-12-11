import styles from "./ModalSkeleton.module.scss";

const ModalSkeleton = () => {
  return (
    <div className={styles["modal-skeleton"]}>
      <div className={styles["modal-skeleton__header"]}></div>
      <div className={styles["modal-skeleton__content"]}>
        <div className={styles["modal-skeleton__line"]}></div>
        <div className={styles["modal-skeleton__line"]}></div>
        <div className={styles["modal-skeleton__line"]}></div>
      </div>
      <div className={styles["modal-skeleton__footer"]}></div>
    </div>
  );
};

export default ModalSkeleton;
