import styles from "./SearchDanjiLink.module.scss";

const SearchDanjiLink = ({ item }: { item: any }) => {
  return (
    <div className={styles["search__danji__link"]}>
      <div className={styles["search__danji__link__thumb"]}>
        <img src={"/pictures/gangnam_hill_2.jpg"} alt="thumb" />
      </div>
    </div>
  );
};

export default SearchDanjiLink;
