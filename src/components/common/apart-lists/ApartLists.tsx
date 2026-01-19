import styles from "./ApartLists.module.scss";
import ApartCard from "../apart-card/ApartCard";
import type { Apartments } from "../../../stores/useSearchTermStore";

const ApartLists = ({
  title,
  fetchedLists,
}: {
  title: string;
  fetchedLists: Apartments[];
}) => {
  return (
    <div className={styles["apart__lists"]}>
      <div className={styles["apart__lists__header"]}>
        <span className={styles["apart__lists__header__title"]}>{title}</span>
        <button>더보기</button>
      </div>
      <div className={styles["apart__lists__main"]}>
        {fetchedLists.slice(0, 2).map((apartment: Apartments) => (
          <ApartCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default ApartLists;
