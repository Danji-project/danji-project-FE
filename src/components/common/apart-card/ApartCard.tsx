import styles from "./ApartCard.module.scss";
import { Link } from "react-router-dom";
import { useUserInfoStore } from "../../../stores/userStore";
import type { Apartments } from "../../../stores/useSearchTermStore";

const ApartCard = ({ apartment }: { apartment: Apartments }) => {
  const { isLogin } = useUserInfoStore();

  return (
    <Link className={styles["apart__card"]} to={`/apart-info/${apartment.id}`}>
      <div className={styles["apart__card__image"]}>
        <img
          src={
            apartment.thumbnailFileUrl
              ? apartment.thumbnailFileUrl
              : "/pictures/placeholder-stock.jpg"
          }
          alt="apart-card"
        />
        <div className={styles["apart__card__location"]}>
          <img src={"/icons/location_mark.svg"} alt="location__mark" />
          <span>{apartment.location}</span>
        </div>
        <div
          className={`${styles["apart__card__bookmark"]} ${
            isLogin ? styles["isLogin"] : styles["isnotLogin"]
          }`}
          role="button"
        >
          <img src="/icons/card_bookmark.png" alt="bookmark" width={16} />
        </div>
      </div>
      <div className={styles["apart__card__information"]}>
        <span>{apartment.name}</span>
        <div>{apartment.name}</div>
        <p>
          <span>총 {apartment.totalUnit}세대</span>
          <span>{24}평</span>
          <span>{5}월 입주</span>
        </p>
      </div>
    </Link>
  );
};

export default ApartCard;
