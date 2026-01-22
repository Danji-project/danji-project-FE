import { useEffect, useState } from "react";
import styles from "./ApartInfo.module.scss";
import Header from "../../layouts/Header";
import ApartDetail from "../../components/apart-detail/ApartDetail";
import CommunityList from "../../components/community/CommunityList";
import { useUserInfoStore } from "../../stores/userStore";
import { useParams } from "react-router";

import { useApartmentDetail } from "../../hooks/useApartmentList";
import useApartDetail from "../../stores/useApartDetail";
import TabList from "../../components/common/tabs/TabList";

const ApartInfo = () => {
  const { isLogin } = useUserInfoStore();

  const { id } = useParams<{ id: string }>();
  const { getApartmentMutation, apartmentPending } = useApartmentDetail();
  const { data: apartDetailData, apartmentId: storeApartmentId } =
    useApartDetail();

  const [tabContent, setTabContent] = useState("단지정보");

  const tabLists = [
    "danji-info/단지정보",
    "community/커뮤니티",
    "notice/공지사항",
    "building-info/시설정보",
  ];

  const currentId = id === "my-apart" ? storeApartmentId : Number(id);

  useEffect(() => {
    if (currentId) {
      getApartmentMutation.mutate({ apartmentId: currentId });
    }
  }, [currentId]);

  return (
    <div className={styles["apart__info"]}>
      <Header
        hasBackButton
        title={apartDetailData.kaptName}
        hasIcons={
          <img src="/icons/card_bookmark.png" alt="bookmark" width={16} />
        }
        onIconClick={() => {}}
      />
      <TabList contents={tabLists} tabs={tabContent} setTabs={setTabContent} />
      {tabContent === "단지정보" && apartDetailData && (
        <ApartDetail apartData={apartDetailData} />
      )}
      {tabContent === "커뮤니티" && apartDetailData && (
        <CommunityList
          apartData={{ ...apartDetailData, apartmentId: currentId! }}
        />
      )}
    </div>
  );
};

export default ApartInfo;
