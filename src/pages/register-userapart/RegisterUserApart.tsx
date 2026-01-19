import { useState } from "react";
import SearchBox from "../../components/common/search-box/search-box";
import Header from "../../layouts/Header";
import { useSearch } from "../../hooks/useSearch";
import ApartBox from "./ApartBox";
import { useSearchTermStore } from "../../stores/useSearchTermStore";
import ApartSearchSkeleton from "./ApartSearchSkeleton";

const RegisterUserApart = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  const { searchFunction, searchPending } = useSearch();
  const { data: searchData } = useSearchTermStore();

  return (
    <>
      <Header title="단지 등록" hasBackButton />
      <SearchBox
        content={searchWord}
        placeholder={"검색어를 입력해 선택해주세요."}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchWord(e.target.value)
        }
        onSearch={() => {
          setIsBoxOpen(true);
          searchFunction.mutate({
            keyword: searchWord,
            lastIndex: 10,
            limit: 20,
          });
        }}
      />
      {searchPending && <ApartSearchSkeleton />}
      {isBoxOpen && !searchPending && <ApartBox searchData={searchData} />}
    </>
  );
};

export default RegisterUserApart;
