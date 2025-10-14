import React from "react";

import styles from "./ApartCard.module.scss";

const ApartCard = ({ apartment }: { apartment: any }) => {
  return (
    <div className={styles["apart__card"]}>
      <div className={styles["apart__card__image"]}>
        <img src={apartment.thumbnailFileUrl} alt="apart-card" />
        <div className={styles["apart__card__location"]}>
          <img src={"/icons/location_mark.svg"} alt="location__mark" />
          <span>{apartment.location}</span>
        </div>
        <div className={styles["apart__card__bookmark"]}>
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
    </div>
  );
};

export default ApartCard;
