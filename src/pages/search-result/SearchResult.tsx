import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBox from "../../components/common/search-box/search-box";
import styles from "./SearchResult.module.scss";
import { useSearchTermStore } from "../../stores/useSearchTermStore";
import { useSearch } from "../../hooks/useSearch";
import SearchDanjiLink from "./SearchDanjiLink";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [changedKeyword, setChangedKeyword] = useState(keyword);
  const navigate = useNavigate();
  const { data: termData } = useSearchTermStore();
  const { searchFunction } = useSearch();

  useEffect(() => {
    searchFunction.mutate(changedKeyword!);
  }, []);

  console.log(termData);

  return (
    <div className={styles["search__result__wrapper"]}>
      <div className={styles["search__result__header"]}>
        <button onClick={() => navigate(-1)}>
          <img src="/svg/back.svg" alt="back" />
        </button>
        <SearchBox
          content={changedKeyword!}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChangedKeyword(e.target.value)
          }
          onSearch={() => navigate(`/search/result?keyword=${changedKeyword}`)}
        />
      </div>
      <div className={styles["search__result"]}>
        <h2>
          검색결과 <span>{termData.totalResultCount}개</span>
        </h2>
        <div className={styles["search__result__list"]}>
          {termData.apartments.length > 0 &&
            termData.apartments.map((item: any) => (
              <SearchDanjiLink key={item.name} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
