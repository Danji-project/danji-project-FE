/* eslint-disable react/no-array-index-key */
import styles from "./SearchSkeleton.module.scss";

const SearchSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText} />
      </div>

      <div className={styles.list}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.thumbnail} />
            <div className={styles.content}>
              <div className={styles.title} />
              <div className={styles.subtitle} />
              <div className={styles.info} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSkeleton;
