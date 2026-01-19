import { useState, useEffect } from "react";
import CommonPagination from "../../components/common/pagination/CommonPagination";
import type { Apartments } from "../../stores/useSearchTermStore";

import styles from "./ApartBox.module.scss";
import ApartCard from "./ApartCard";

const ApartBox = ({
  searchData,
}: {
  searchData: {
    apartments: Apartments[];
    totalResultCount: number;
    lastPage: boolean;
  };
}) => {
  // 페이지네이션 하나당 갯수
  const PER_NUMBER = 5;

  // 페이지네이션 변수
  const [pagination, setPagination] = useState<number>(0);

  // 선택된 아파트 ID
  const [selectedApartId, setSelectedApartId] = useState<number | null>(null);

  // pagination 변경 시 선택 초기화
  useEffect(() => {
    setSelectedApartId(null);
  }, [pagination]);

  return (
    <div className={styles["apart__box__wrapper"]}>
      {searchData.apartments
        ?.slice(pagination * PER_NUMBER, (pagination + 1) * PER_NUMBER)
        .map((sd: Apartments) => (
          <ApartCard
            sd={sd}
            key={sd.id}
            isSelected={selectedApartId !== null && selectedApartId === sd.id}
            onSelect={() => {
              setSelectedApartId(sd.id);
            }}
          />
        ))}
      {searchData.apartments.length === 0 && (
        <div className={styles["apart__box__none"]}>
          <span>검색 결과가 없습니다. 다시 검색해주세요.</span>
        </div>
      )}
      {searchData.apartments.length > 0 && (
        <CommonPagination
          pagination={pagination}
          totalResultCount={searchData.totalResultCount}
          setPagination={setPagination}
          perNumber={PER_NUMBER}
        />
      )}
    </div>
  );
};

export default ApartBox;
