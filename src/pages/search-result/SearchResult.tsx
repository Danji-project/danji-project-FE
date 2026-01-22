import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./SearchResult.module.scss";
import SearchBox from "../../components/common/search-box/search-box";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchResultList from "./SearchResultList";
import { useSearch } from "../../hooks/useSearch";
import { useSearchTermStore } from "../../stores/useSearchTermStore";
import SearchApartCardSkeleton from "../../components/common/search-apart-card/SearchApartCardSkeleton";

const SearchResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [searchContent, setSearchContent] = useState<string>(keyword!);
  const { searchFunction, searchPending } = useSearch();
  const { data: searchResultData } = useSearchTermStore();

  useEffect(() => {
    if (keyword) {
      searchFunction.mutate({ keyword, lastIndex: 0, limit: 10 });
    }
  }, [keyword]);

  return (
    <div className={styles["search__result__wrapper"]}>
      <div className={styles["search__result__header"]}>
        <button>
          <IoIosArrowBack size={20} />
        </button>
        <SearchBox
          content={searchContent}
          placeholder={""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchContent(e.target.value)
          }
          onSearch={() => {
            if (!searchContent) {
              return;
            }
            navigate(`/search/result?keyword=${searchContent}`);
          }}
        />
      </div>
      {searchPending ? (
        <div className={styles["search__result__skeleton"]}>
          {Array.from({ length: 5 }).map((_, index) => (
            <SearchApartCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <SearchResultList data={searchResultData} />
      )}
    </div>
  );
};

export default SearchResult;
