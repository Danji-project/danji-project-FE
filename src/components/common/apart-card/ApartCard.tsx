import styles from "./ApartCard.module.scss";
import { Link } from "react-router-dom";
import type { BaseApartInfo } from "../../../api/types";
import { useUserInfo } from "../../../stores/userStore";
import { useBookMark } from "../../../hooks/useBookMark";

const ApartCard = ({ apartment }: { apartment: BaseApartInfo }) => {
  const { isLogin } = useUserInfo();
  const { ApartBookMarkMutate } = useBookMark();

  const clickBookMark= (e: React.MouseEvent<HTMLDivElement>) => {
    //console.log("book mark on!");
    ApartBookMarkMutate(apartment.id);
    e.stopPropagation();
    e.preventDefault();
  };


  return (
    <Link className={styles["apart__card"]} to={`/apart-info/${apartment.id}`}>
      <div className={styles["apart__card__image"]}>
        <img src={apartment.thumbnailFileUrl!} alt="apart-card" />
        <div className={styles["apart__card__location"]}>
          <img src={"/icons/location_mark.svg"} alt="location__mark" />
          <span>{apartment.location}</span>
        </div>
        <div className={`${styles["apart__card__bookmark"]} ${isLogin? styles["isLogin"] : styles["isnotLogin"]}`} 
             onClick={clickBookMark} role="button">
          <img src="/icons/card_bookmark.png" alt="bookmark" width={16} />
        </div>
      </div>
      <div className={styles["apart__card__information"]}>
        <span>{apartment.name}</span>
        <div>{apartment.apartDetailName}</div>
        <p>
          <span>총 {apartment.totalCount}세대</span>
          <span>{apartment.houseSize}평</span>
          <span>{apartment.moveAbleMonth}월 입주</span>
        </p>
      </div>
    </Link>
  );
};

export default ApartCard;
