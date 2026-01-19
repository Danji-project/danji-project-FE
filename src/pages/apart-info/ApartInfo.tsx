import { useEffect, useState } from "react";
import styles from "./ApartInfo.module.scss";
import Header from "../../layouts/Header";
import ApartDetail from "../../components/apart-detail/ApartDetail";
import CommunityList from "../../components/community/CommunityList";
import { useUserInfoStore } from "../../stores/userStore";
import { useLocation, useParams } from "react-router";

import { useApartmentDetail } from "../../hooks/useApartmentList";
import useApartDetail from "../../stores/useApartDetail";
import TabList from "../../components/common/tabs/TabList";
import SyncLoader from "react-spinners/SyncLoader";

const ApartInfo = () => {
  const { isLogin } = useUserInfoStore();
  const location = useLocation();

  const { id } = useParams<{ id: string }>();
  const { getApartmentMutation, apartmentPending } = useApartmentDetail();
  const { data: apartDetailData, apartmentId: storeApartmentId } = useApartDetail();

  const [tabContent, setTabContent] = useState<string>(
    location.pathname.includes("/community") ? "커뮤니티" : "단지정보"
  );

  const tabLists = [
    "단지정보/단지정보",
    "커뮤니티/커뮤니티",
    "공지사항/공지사항",
    "시설정보/시설정보",
  ];

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      getApartmentMutation.mutate({ apartmentId: Number(id) });
    }
  }, [id]);

  // 해당 단지의 데이터가 메모리(Zustand)에 이미 있다면 로딩을 건너뜀 (새로고침 시 유지)
  const isCorrectApartment = storeApartmentId === Number(id);

  if (apartmentPending && !isCorrectApartment) {
    return (
      <div className={styles["loading__container"]}>
        <SyncLoader color="#97bbff" />
      </div>
    );
  }

  const renderData = isCorrectApartment ? apartDetailData : null;

  return (
    <div className={styles["apart__info"]}>
      <Header
        hasBackButton
        title={renderData?.name || "단지 정보"}
        hasIcons={
          isLogin ? (
            <img src="/icons/card_bookmark.png" alt="bookmark" width={16} />
          ) : (
            <></>
          )
        }
        onIconClick={() => { }}
      />
      <TabList contents={tabLists} tabs={tabContent} setTabs={setTabContent} />
      {tabContent === "단지정보" && renderData && (
        <ApartDetail apartData={renderData} />
      )}
      {tabContent === "커뮤니티" && renderData && (
        <CommunityList apartData={{ ...renderData, id: storeApartmentId! } as any} />
      )}
    </div>
  );
};

export default ApartInfo;
