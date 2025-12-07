/* eslint-disable react/no-array-index-key */
import styles from "./AppSkeleton.module.scss";

const AppSkeleton = () => {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.previewDevice}>
        <div className={styles.appContainer}>
          <div className={styles.statusBar}>
            <div className={styles.time} />
            <div className={styles.icons}>
              <div className={styles.wifi} />
              <div className={styles.battery} />
            </div>
          </div>

          <div className={styles.contentArea}>
            <div className={styles.header}>
              <div className={styles.logo} />
              <div className={styles.menu} />
            </div>
            <div className={styles.searchCard} />
            <div className={styles.cardList}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardImage} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardTitle} />
                    <div className={styles.cardSubtitle} />
                    <div className={styles.cardInfo} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.serviceIntro}>
        <div className={styles.logoWrap} />
        <div className={styles.logoName}>
          <div className={styles.logoTitle} />
          <div className={styles.logoSub} />
        </div>
        <div className={styles.serviceBody}>
          <div className={styles.h3} />
          <div className={styles.span} />
        </div>
        <div className={styles.serviceList}>
          <div className={styles.btn} />
          <div className={styles.btn} />
          <div className={styles.btn} />
          <div className={styles.btn} />
        </div>
      </div>
    </div>
  );
};

export default AppSkeleton;
