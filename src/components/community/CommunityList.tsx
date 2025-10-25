import { useEffect, useState } from "react";
import type { BaseApartInfo } from "../../model/BaseApartInfoModel";
import { useFeedList } from "../../hooks/useFeedList";
import {
  useFeedListStore,
  type FeedList3,
} from "../../stores/useFeedListStore";

import styles from "./CommunityList.module.scss";
import ComboBox from "../common/combobox/ComboBox";
import { sortContents } from "../../assets/mock/tabsMocks";
import CommunityCard from "./CommunityCard";
import { useRootPositionStore } from "../../stores/rootPositionStore";
import { useNavigate } from "react-router-dom";

const CommunityList = ({ apartData }: { apartData: BaseApartInfo }) => {
  const [selectedSort, setSelectedSort] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);
  const { feedListMutate } = useFeedList(apartData.id, selectedSort);
  const { data } = useFeedListStore();
  const { positionTop, positionLeft } = useRootPositionStore();
  const navigate = useNavigate();

  useEffect(() => {
    feedListMutate();
  }, []);

  return (
    <div className={styles["community__list"]}>
      <div className={styles["community__list__title"]}>
        {sortContents.map(
          (s: string) =>
            s.split("/")[1] === selectedSort && <h1>{s.split("/")[0]}</h1>
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
        {data.feedDtoList.map((fdl: FeedList3) => (
          <CommunityCard cardData={fdl} apartData={apartData} />
        ))}
      </div>
      <button
        className={styles["community__list__write"]}
        style={{
          bottom: `${positionTop}px`,
          left: `${positionLeft}px`,
        }}
        onClick={() => {
          navigate(`/apart-info/${apartData.id}/write`);
        }}
      >
        <img src={"/icons/write.svg"} alt="write" />
      </button>
    </div>
  );
};

export default CommunityList;
