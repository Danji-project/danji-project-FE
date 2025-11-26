import styles from "./ApartLists.module.scss";
import ApartCard from "../apart-card/ApartCard";
import type { BaseApartInfo } from "../../../model/BaseApartInfoModel";

const ApartLists = ({
  title,
  fetchedLists,
}: {
  title: string;
  fetchedLists: BaseApartInfo[];
}) => {
  return (
    <div className={styles["apart__lists"]}>
      <div className={styles["apart__lists__header"]}>
        <span className={styles["apart__lists__header__title"]}>{title}</span>
        <button>더보기</button>
      </div>
      <div className={styles["apart__lists__main"]}>
        {fetchedLists.map((apartment: BaseApartInfo) => (
          <ApartCard apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default ApartLists;
