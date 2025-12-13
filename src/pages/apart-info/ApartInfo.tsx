import { useState, useEffect } from "react";

import styles from "./ApartInfo.module.scss";
import Header from "../../layouts/Header";
import { useParams, useLocation } from "react-router-dom";
import { fetchedApartments } from "../../assets/mock/apartmentMock";
import TabList from "../../components/common/tabs/TabList";
import { apartTabs } from "../../assets/mock/tabsMocks";
import ApartDetail from "../../components/apart-detail/ApartDetail";
import CommunityList from "../../components/community/CommunityList";

const ApartInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const [tabContents, setTabContents] = useState("apart-info");

  // URL 경로에 따라 탭 자동 설정
  useEffect(() => {
    if (location.pathname.includes("/community")) {
      setTabContents("community");
    } else {
      setTabContents("apart-info");
    }
  }, [location.pathname]);

  const filteredApartment = fetchedApartments.filter(
    (item) => item.id === Number(id)
  )[0];

  return (
    <div className={styles["apart__info"]}>
      <Header
        hasBackButton
        title={filteredApartment.apartDetailName!}
        hasIcons={
          <img src="/icons/card_bookmark.png" alt="bookmark" width={16} />
        }
      />
      <TabList
        contents={apartTabs}
        tabs={tabContents}
        setTabs={setTabContents}
      />
      {tabContents === "apart-info" && (
        <ApartDetail apartData={filteredApartment} />
      )}
      {tabContents === "community" && (
        <CommunityList apartData={filteredApartment} />
      )}
    </div>
  );
};

export default ApartInfo;
