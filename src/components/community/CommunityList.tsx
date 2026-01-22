import { useEffect, useState } from "react";
import styles from "./CommunityList.module.scss";
import ComboBox from "../common/combobox/ComboBox";
import type { ApartmentDetail } from "../../hooks/useApartmentList";
import { useGetFeedList } from "../../hooks/useFeedList";
import { useFeedListStore, type FeedDTO } from "../../stores/useFeedListStore";
import { usePositionStore } from "../../stores/usePositionStore";
import { useNavigate } from "react-router-dom";
import CommunityFeedCard from "./CommunityFeedCard";
import CommunitySkeleton from "../common/community-skeleton/CommunitySkeleton";
import { useFeedRegisterStore } from "../../stores/useFeedRegisterStore";

const sortContents = ["전체/ALL", "인기순/POPULAR", "최신순/LATEST"];

interface ApartmentDetailPlus extends ApartmentDetail {
  apartmentId: number;
}

const CommunityList = ({ apartData }: { apartData: ApartmentDetailPlus }) => {
  const [selectedSort, setSelectedSort] = useState("전체/ALL");
  const { getFeedList, getFeedListLoading } = useGetFeedList();
  const { data: feedListData } = useFeedListStore();
  const { setMode } = useFeedRegisterStore();
  const { positionXEnd, positionYStart } = usePositionStore();
  const navigate = useNavigate();

  useEffect(() => {
    getFeedList.mutate({
      apartmentId: apartData.apartmentId,
      sort: selectedSort.split("/")[1],
    });
  }, [apartData.apartmentId]);

  return (
    <div className={styles["community__list"]}>
      <div className={styles["community__list__title"]}>
        <h2>{selectedSort.split("/")[0]}</h2>
        <ComboBox
          state={selectedSort.split("/")[0]}
          setState={(element: string) => {
            setSelectedSort(element);
            getFeedList.mutate({
              apartmentId: apartData.apartmentId,
              sort: selectedSort.split("/")[1],
            });
          }}
          list={sortContents}
        />
      </div>
      <div className={styles["community__list__wrapper"]}>
        {getFeedListLoading &&
          Array.from({ length: 3 }, (_, i) => {
            return <CommunitySkeleton key={i} />;
          })}
        {!getFeedListLoading &&
          feedListData?.feedDtoList.map((feedDto: FeedDTO) => (
            <CommunityFeedCard key={feedDto.feedId} feedDto={feedDto} />
          ))}
      </div>
      <div
        className={styles["community__list__write"]}
        style={{
          left: `${positionXEnd}px`,
          transform: "translateX(calc(-100% - 20px))",
          bottom: `${positionYStart}px`,
          marginBottom: "30px",
          marginRight: "20px",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setMode("REGISTER");
            navigate(`/apart-info/${apartData.apartmentId}/write`);
          }}
        >
          <img src="/write.svg" alt="write-button" />
        </button>
      </div>
    </div>
  );
};

export default CommunityList;
