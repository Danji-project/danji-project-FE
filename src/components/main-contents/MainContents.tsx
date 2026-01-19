import React, { useEffect, type Dispatch, type SetStateAction } from "react";

import styles from "./MainContents.module.scss";
import SearchBox from "../common/search-box/search-box";
import { useNavigate } from "react-router-dom";
import { useNewApartList } from "../../hooks/useApartmentList";
import ApartLists from "../common/apart-lists/ApartLists";

const MainContents = ({
  searchContent,
  setSearchContent,
}: {
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  const { termResultData, getGangnam } = useNewApartList();

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
          navigate(`/search/result?keyword=${searchContent}`);
        }}
      />
      <ApartLists
        title={"신축아파트 분양정보"}
        fetchedLists={termResultData.apartments}
      />
    </div>
  );
};

export default MainContents;
