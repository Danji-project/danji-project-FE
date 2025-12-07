/* eslint-disable react/no-array-index-key */
import styles from "./CommunitySkeleton.module.scss";

const CommunitySkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title} />
        <div className={styles.comboBox} />
      </div>

      <div className={styles.main}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.textContent}>
                <div className={styles.cardTitle} />
                <div className={styles.cardText} />
              </div>
              <div className={styles.cardImage} />
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.cardInfo}>
                <div className={styles.infoBadge} />
                <div className={styles.infoText} />
                <div className={styles.infoText} />
              </div>
              <div className={styles.cardIcons}>
                <div className={styles.icon} />
                <div className={styles.icon} />
                <div className={styles.icon} />
                <div className={styles.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunitySkeleton;
