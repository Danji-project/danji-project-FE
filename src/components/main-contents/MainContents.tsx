import React, { type Dispatch, type SetStateAction } from "react";

import styles from "./MainContents.module.scss";
import SearchBox from "../common/search-box/search-box";
import ApartLists from "../common/apart-lists/ApartLists";
import { fetchedApartments } from "../../assets/mock/apartmentMock";
import { useNavigate } from "react-router-dom";

const MainContents = ({
  searchContent,
  setSearchContent,
}: {
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

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
        title={"신축 아파트 분양정보"}
        fetchedLists={fetchedApartments}
      />
      <ApartLists title={"요즘 뜨는 아파트"} fetchedLists={fetchedApartments} />
    </div>
  );
};

export default MainContents;
