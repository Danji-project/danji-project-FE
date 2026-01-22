import styles from "./SearchApartCardSkeleton.module.scss";

const SearchApartCardSkeleton = () => {
  return (
    <div className={styles["skeleton__card"]}>
      <div className={styles["skeleton__card__profile"]} />
      <div className={styles["skeleton__card__info"]}>
        <div className={styles["skeleton__line"]} />
        <div className={styles["skeleton__line"]} />
        <div className={styles["skeleton__line"]} />
      </div>
    </div>
  );
};

export default SearchApartCardSkeleton;
