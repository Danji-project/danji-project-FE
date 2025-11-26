import type { FeedList3 } from "../../stores/useFeedListStore";

import styles from "./CommunityCard.module.scss";
import SmallIcon from "../common/small-icon/SmallIcon";
import type { BaseApartInfo } from "../../model/BaseApartInfoModel";
import { Link } from "react-router-dom";
import { useFeedViewIncrease } from "../../hooks/useFeedViewIncrease";

const CommunityCard = ({
  cardData,
  apartData,
}: {
  cardData: FeedList3;
  apartData: BaseApartInfo;
}) => {
  const { feedViewIncreaseMutate } = useFeedViewIncrease(cardData.feedId);

  return (
    <Link
      className={styles["community__card"]}
      to={`/apart-info/${apartData.id}/community-detail/${cardData.feedId}`}
      onClick={() => {
        feedViewIncreaseMutate();
      }}
    >
      <div className={styles["community__card__top"]}>
        <div className={styles["community__card__top__text"]}>
          <h2>{cardData.title}</h2>
          <p>{cardData.contents}</p>
        </div>
        {cardData.thumbnailFileUrl && (
          <div className={styles["community__card__top__image"]}>
            <img src={cardData.thumbnailFileUrl} alt="thumbnail" />
          </div>
        )}
      </div>
      <div className={styles["community__card__bottom"]}>
        <div className={styles["community__card__bottom__info"]}>
          <span>작성자</span>
          <span>{cardData.nickName}</span>
          <span>{cardData.localDateTime.split("T")[0]}</span>
        </div>
        <div className={styles["community__card__bottom__icons"]}>
          <SmallIcon
            iconSrc={"/icons/seeSight.svg"}
            number={cardData.viewCount}
          />
          <SmallIcon
            iconSrc={"/icons/like.svg"}
            number={cardData.reactionCount}
          />
          <SmallIcon
            iconSrc={"/icons/bookmark.svg"}
            number={cardData.bookmarkCount}
          />
          <SmallIcon
            iconSrc={"/icons/comment.svg"}
            number={cardData.commentCount}
          />
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
