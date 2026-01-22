import { useState } from "react";
import SearchApartCard from "../../components/common/search-apart-card/SearchApartCard";
import type { Apartments } from "../../stores/useSearchTermStore";
import styles from "./SearchResultList.module.scss";
import CommonPagination from "../../components/common/pagination/CommonPagination";

const SearchResultList = ({
  data,
}: {
  data: {
    apartments: Apartments[];
    totalResultCount: number;
    lastPage: boolean;
  };
}) => {
  const [page, setPage] = useState<number>(0);

  return (
    <>
      <div className={styles["search__result__list"]}>
        {data.apartments.length === 0 && <span>검색어 결과가 없습니다.</span>}
        {data.apartments.length > 0 &&
          data.apartments
            .slice(page * 5, page * 5 + 5)
            .map((apartment: Apartments, index: number) => (
              <SearchApartCard key={apartment.id ?? `page-${page}-${index}`} data={apartment} />
            ))}
      </div>
      {data.apartments.length > 5 && (
        <CommonPagination
          pagination={page}
          setPagination={setPage}
          totalResultCount={data.apartments.length}
          perNumber={5}
        />
      )}
    </>
  );
};

export default SearchResultList;
