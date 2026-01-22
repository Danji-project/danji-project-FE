import { useEffect, useState } from "react";
import styles from "./SearchInit.module.scss";
import SearchBox from "../../components/common/search-box/search-box";
import { useNavigate } from "react-router";
import { useSearch } from "../../hooks/useSearch";
import InitList from "./InitList";
import InitListSkeleton from "./InitListSkeleton";

const SearchInit = () => {
  const [searchContent, setSearchContent] = useState<string>("");
  const { getPopularTerm, popular, popularPending } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    getPopularTerm.mutate({ limit: 5 });
  }, []);

  return (
    <div className={styles["search__init__wrapper"]}>
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
      {!popularPending && <InitList title={"인기 검색어"} data={popular} />}
      {popularPending && <InitListSkeleton />}
    </div>
  );
};

export default SearchInit;
