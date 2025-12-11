import { Link } from "react-router-dom";
import styles from "./SearchDanjiLink.module.scss";

interface ApartmentItem {
  id: number | null;
  name: string;
  region: string;
  location: string;
  totalUnit: number | null;
  buildingCount: number | null;
  thumbnailFileUrl: string | null;
  isBookmarked: boolean;
  kaptCode: string;
}

const SearchDanjiLink = ({ item }: { item: ApartmentItem }) => {
  return (
    <Link
      to={item.id ? `/apart-info/${item.id}` : "#"}
      className={styles["search__danji__link"]}
      onClick={(e) => {
        if (!item.id) {
          e.preventDefault();
        }
      }}
    >
      <div className={styles["search__danji__link__thumb"]}>
        <img
          src={item.thumbnailFileUrl || "/pictures/gangnam_hill_2.jpg"}
          alt={item.name}
        />
      </div>
      <div className={styles["search__danji__link__info"]}>
        <h3 className={styles["search__danji__link__info__title"]}>
          {item.name}
        </h3>
        <p className={styles["search__danji__link__info__location"]}>
          {item.region} {item.location}
        </p>
        <p className={styles["search__danji__link__info__detail"]}>
          {item.totalUnit && item.buildingCount
            ? `아파트 ${item.totalUnit.toLocaleString()}세대 | 총 ${
                item.buildingCount
              }동`
            : "정보 준비중"}
        </p>
      </div>
    </Link>
  );
};

export default SearchDanjiLink;
