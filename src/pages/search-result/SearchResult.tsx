import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBox from "../../components/common/search-box/search-box";
import styles from "./SearchResult.module.scss";
import { useSearchTermStore } from "../../stores/useSearchTermStore";
import { useSearch } from "../../hooks/useSearch";
import SearchDanjiLink from "./SearchDanjiLink";
import SearchSkeleton from "../../components/common/search-skeleton/SearchSkeleton";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [changedKeyword, setChangedKeyword] = useState(keyword);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const termData = useSearchTermStore();
  const { searchFunction, searchPending } = useSearch();

  const ITEMS_PER_PAGE = 10;
  const apartments = termData.data?.apartments || [];
  const totalPages = Math.ceil(apartments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentApartments = apartments.slice(startIndex, endIndex);

  useEffect(() => {
    if (keyword) {
      setChangedKeyword(keyword);
      setCurrentPage(1);
      searchFunction.mutate(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
      {searchPending ? (
        <SearchSkeleton />
      ) : (
        <div className={styles["search__result"]}>
          <h2>
            검색결과 <span>{termData.data?.totalResultCount || 0}건</span>
          </h2>
          <div className={styles["search__result__list"]}>
            {currentApartments.length > 0 ? (
              currentApartments.map((item: any) => (
                <SearchDanjiLink key={item.kaptCode} item={item} />
              ))
            ) : (
              <div className={styles["search__result__empty"]}>
                검색 결과가 없습니다.
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className={styles["search__result__pagination"]}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={styles["pagination__arrow"]}
                aria-label="이전 페이지"
              >
                &lt;
              </button>
              <div className={styles["pagination__indicators"]}>
                {totalPages <= 7 ? (
                  Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`${styles["pagination__indicator"]} ${
                          currentPage === page
                            ? styles["pagination__indicator--active"]
                            : ""
                        }`}
                        aria-label={`${page}페이지로 이동`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    )
                  )
                ) : (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={`${styles["pagination__indicator"]} ${
                        currentPage === 1
                          ? styles["pagination__indicator--active"]
                          : ""
                      }`}
                      aria-label="1페이지로 이동"
                    >
                      1
                    </button>
                    {currentPage > 3 && (
                      <span className={styles["pagination__ellipsis"]}>…</span>
                    )}
                    {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                      .filter((page) => page > 1 && page < totalPages)
                      .map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`${styles["pagination__indicator"]} ${
                            currentPage === page
                              ? styles["pagination__indicator--active"]
                              : ""
                          }`}
                          aria-label={`${page}페이지로 이동`}
                        >
                          {page}
                        </button>
                      ))}
                    {currentPage < totalPages - 2 && (
                      <span className={styles["pagination__ellipsis"]}>…</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`${styles["pagination__indicator"]} ${
                        currentPage === totalPages
                          ? styles["pagination__indicator--active"]
                          : ""
                      }`}
                      aria-label={`${totalPages}페이지로 이동`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className={styles["pagination__arrow"]}
                aria-label="다음 페이지"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
