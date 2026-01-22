import React, { useEffect, type Dispatch, type SetStateAction } from "react";

import styles from "./MainContents.module.scss";
import SearchBox from "../common/search-box/search-box";
import { useNavigate } from "react-router-dom";
import { useNewApartList } from "../../hooks/useApartmentList";
import ApartLists from "../common/apart-lists/ApartLists";
import ApartListSkeleton from "../common/apart-lists/ApartListSkeleton";

const MainContents = ({
  searchContent,
  setSearchContent,
}: {
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  const { termResultData, getGangnam, newApartListPending } = useNewApartList();

  // 신축아파트 분양정보 리스트
  useEffect(() => {
    getGangnam.mutate();
  }, []);

  return (
    <div className={styles["main__contents"]}>
      <SearchBox
        content={searchContent}
        placeholder={"궁금한 단지를 검색해보세요!"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchContent(e.target.value);
        }}
        onSearch={() => {
          if (searchContent === "") {
            navigate(`/search/search-init`);
          } else {
            navigate(`/search/result?keyword=${searchContent}`);
          }
        }}
      />
      {!newApartListPending && (
        <ApartLists
          title={"신축아파트 분양정보"}
          fetchedLists={termResultData.apartments}
        />
      )}
      {newApartListPending && (
        <div className={styles["apart__skeleton__wrap"]}>
          <h2>신축아파트 분양정보</h2>
          <div className={styles["apart__skeleton__wrapper"]}>
            {Array.from({ length: 2 }, (_, i) => (
              <ApartListSkeleton key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContents;
