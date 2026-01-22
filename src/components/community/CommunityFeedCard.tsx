import type { FeedDTO } from "../../stores/useFeedListStore";
import SmallIcon from "../common/small-icon/SmallIcon";
import styles from "./CommunityFeedCard.module.scss";
import { Link, useParams } from "react-router-dom";

const CommunityFeedCard = ({ feedDto }: { feedDto: FeedDTO }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Link to={`/apart-info/${Number(id)}/detail/${feedDto.feedId}`}>
      <div className={styles["community__feed__card"]}>
        <h2>{feedDto.title}</h2>
        <div className={styles["community__feed__card__content"]}>
          <p>
            {feedDto.contents.includes("\n")
              ? feedDto.contents
                  .split("\n")
                  .map((split: string) => <span key={split}>{split}</span>)
              : feedDto.contents}
          </p>
          {feedDto.thumbnailFileUrl && (
            <div className={styles["community__feed__card__img"]}>
              <img src={feedDto.thumbnailFileUrl} alt="feed-thumbnail" />
            </div>
          )}
        </div>
        <div className={styles["community__feed__card__info"]}>
          <div className={styles["community__feed__card__info__author"]}>
            <span>작성자</span>
            <span>{feedDto.nickName}</span>
            <span>
              {feedDto.localDateTime.split("-")[0]}.
              {feedDto.localDateTime.split("-")[1]}.
              {feedDto.localDateTime.split("-")[1].split("T")[0]}
            </span>
          </div>
          <div className={styles["community__feed__card__info__icon"]}>
            <SmallIcon
              iconSrc={"/icons/seeSight.svg"}
              number={feedDto.viewCount}
            />
            <SmallIcon
              iconSrc={"/icons/like.svg"}
              number={feedDto.reactionCount}
            />
            <SmallIcon
              iconSrc={"/icons/bookmark.svg"}
              number={feedDto.bookmarkCount}
            />
            <SmallIcon
              iconSrc={"/icons/comment.svg"}
              number={feedDto.commentCount}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CommunityFeedCard;
