import { Link } from "react-router-dom";
import { useState } from "react";
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
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // TODO: 즐겨찾기 API 호출
    console.log("즐겨찾기 토글:", item.kaptCode, !isBookmarked);
  };

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
      <button
        className={styles["search__danji__link__bookmark"]}
        onClick={handleBookmarkClick}
        aria-label="즐겨찾기"
      >
        {isBookmarked ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFB800">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#CCCCCC"
            strokeWidth="2"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        )}
      </button>
    </Link>
  );
};

export default SearchDanjiLink;
