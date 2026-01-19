import { useEffect, useRef, useState } from "react";
import type { BaseApartInfo } from "../../api";
import { useFeedList } from "../../hooks/useFeedList";
import {
  useFeedListStore,
  type FeedList3,
} from "../../stores/useFeedListStore";

import styles from "./CommunityList.module.scss";
import ComboBox from "../common/combobox/ComboBox";
import CommunityCard from "./CommunityCard";
import { useNavigate } from "react-router-dom";
import CommunitySkeleton from "../common/community-skeleton/CommunitySkeleton";
import { useUserInfoStore } from "../../stores/userStore";

const sortContents = [
  "전체 게시글/ALL",
  "인기 게시글/POPULAR",
  "최신 게시글/LATEST",
];

const CommunityList = ({ apartData }: { apartData: BaseApartInfo }) => {
  const [selectedSort, setSelectedSort] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);
  const [size, setPosition] = useState({
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  });

  const { feedListMutate, feedListPending } = useFeedList(
    apartData.id,
    selectedSort
  );
  const { data } = useFeedListStore();
  const { isLogin } = useUserInfoStore();
  const navigate = useNavigate();
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedListMutate();
    sessionStorage.setItem("tabselect", "community");

    const updateSize = () => {
      if (childRef.current) {
        const rect = childRef.current.getBoundingClientRect();

        // rect.left: 뷰포트 왼쪽 경계에서 요소의 왼쪽 경계까지의 거리 (픽셀)
        // rect.right: 뷰포트 왼쪽 경계에서 요소의 오른쪽 경계까지의 거리 (픽셀)
        setPosition({
          left: rect.left,
          right: rect.right,
          width: childRef.current.offsetWidth,
          height: childRef.current.offsetHeight,
        });
      }
    };

    updateSize(); // 초기 렌더링 시 크기 설정

    // 윈도우 크기 변경 시 크기 재측정 (반응형 대응)
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize); // 클린업 함수
    //console.log(isLogin);
  }, [selectedSort]);

  if (feedListPending) {
    return <CommunitySkeleton />;
  }

  return (
    <div className={styles["community__list"]} ref={childRef}>
      <div className={styles["community__list__title"]}>
        {sortContents.map(
          (s: string) =>
            s.split("/")[1] === selectedSort && (
              <h1 key={`title-${selectedSort}`}>{s.split("/")[0]}</h1>
            )
        )}
        <ComboBox
          contents={sortContents}
          setState={setSelectedSort}
          state={selectedSort}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          apartmentId={apartData.id}
        />
      </div>
      <div className={styles["community__list__main"]}>
        {data.feedDtoList.length > 0 ? (
          data.feedDtoList.map((fdl: FeedList3) => (
            <CommunityCard
              key={fdl.feedId}
              cardData={fdl}
              apartData={apartData}
            />
          ))
        ) : (
          <div className={styles["community__list__empty"]}>
            게시글이 없습니다.
          </div>
        )}
      </div>
      {isLogin ? (
        <button
          className={styles["community__list__write"]}
          style={{
            left: `${size.left + size.width - 30}px`,
          }}
          onClick={() => {
            navigate(`/apart-info/${apartData.id}/write`);
          }}
        >
          <img src={"/icons/write.svg"} alt="write" />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommunityList;
