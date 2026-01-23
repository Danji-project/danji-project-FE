import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Apartments } from "../../../stores/useSearchTermStore";
import styles from "./SearchApartCard.module.scss";
import { FaRegStar } from "react-icons/fa";
import { useModifyDB } from "../../../hooks/useModifyDB";

const SearchApartCard = ({ data }: { data: Apartments }) => {
  const navigate = useNavigate();
  const { modifyDB, registerApartment } = useModifyDB();

  const conditionGo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (data.id === null) {
      e.preventDefault();
      modifyDB(data);
    }
  };

  useEffect(() => {
    if (registerApartment.isSuccess && registerApartment.data?.data?.id) {
      navigate(`/apart-info/${registerApartment.data.data.id}`);
    }
  }, [registerApartment.isSuccess, registerApartment.data, navigate]);

  const goBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      to={`/apart-info/${data.id}`}
      onClick={conditionGo}
      className={styles["search__apart__card"]}
    >
      <div className={styles["search__apart__card__profile"]}>
        <img
          src={
            data.thumbnailFileUrl
              ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                data.thumbnailFileUrl
              : "/pictures/placeholder-stock.jpg"
          }
          alt="apart-thumbnail"
        />
      </div>
      <div className={styles["search__apart__card__info"]}>
        <span>{data.name}</span>
        <span>{data.region + " " + data.location}</span>
        <span>아파트 12,032 세대</span>
      </div>
      <button onClick={goBookmark}>
        <FaRegStar color={"rgb(255,183,0)"} />
      </button>
    </Link>
  );
};

export default SearchApartCard;
