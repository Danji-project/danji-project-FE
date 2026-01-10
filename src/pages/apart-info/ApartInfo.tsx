import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import styles from "./ApartInfo.module.scss";
import Header from "../../layouts/Header";
import { useParams } from "react-router-dom";
import { fetchedApartments } from "../../assets/mock/apartmentMock";
import TabList from "../../components/common/tabs/TabList";
import { apartTabs } from "../../assets/mock/tabsMocks";
import ApartDetail from "../../components/apart-detail/ApartDetail";
import CommunityList from "../../components/community/CommunityList";
import { useBookMark } from "../../hooks/useBookMark";
import { useUserInfo } from "../../stores/userStore";
import { API_ENDPOINTS } from "../../api/endpoints";
import type { BaseApartInfo } from "../../model/BaseApartInfoModel";
import type { ApartmentItem } from "../../api/types";

const ApartInfo = () => {
  const { isLogin } = useUserInfo();
  const apartmentId = useUserInfo((state) => state.apartmentId);
  const apartmentName = useUserInfo((state) => state.apartmentName);
  const region = useUserInfo((state) => state.region);
  const location = useUserInfo((state) => state.location);

  // 각 값들을 메모이제이션해서 무한 루프 방지
  const userApartmentInfo = useMemo(
    () => ({
      apartmentId,
      apartmentName,
      region,
      location,
    }),
    [apartmentId, apartmentName, region, location]
  );

  const { id } = useParams();
  const [tabContents, setTabContents] = useState("apart-info");
  const [filteredApartment, setFilteredApartment] =
    useState<BaseApartInfo | null>(null);
  const [apiApartment, setApiApartment] = useState<ApartmentItem | null>(null);

  const { ApartBookMarkMutate } = useBookMark();

  const clickBookMark = () => {
    const apartId = Number(id);
    ApartBookMarkMutate(apartId);
  };

  useEffect(() => {
    const first = sessionStorage.getItem("tabselect");
    if (first) {
      setTabContents(first);
    } else {
      setTabContents("apart-info");
    }
  }, [id]);

  // API로부터 아파트 정보 조회
  useEffect(() => {
    if (id) {
      const fetchApartmentData = async () => {
        try {
          const response = await axios.get(
            `/api${API_ENDPOINTS.USER.GETAPARTMENT}?id=${id}`
          );
          console.log("API 응답:", response.data);
          if (response.data && response.data.data) {
            const apiData = response.data.data;
            // API 응답을 ApartmentItem 형식으로 변환
            const apartmentItem: ApartmentItem = {
              id: apiData.id || null,
              name: apiData.name || apiData.kaptName || "",
              region: apiData.region || "",
              location: apiData.location || apiData.kaptAddr || "",
              totalUnit: apiData.totalUnit || null,
              buildingCount: apiData.buildingCount || null,
              thumbnailFileUrl: apiData.fileUrl || null,
              isBookmarked: false,
              kaptCode: apiData.kaptCode || "",
            };
            setApiApartment(apartmentItem);
          }
        } catch (error) {
          console.error("아파트 정보 조회 실패:", error);
        }
      };
      fetchApartmentData();
    }
  }, [id]);

  useEffect(() => {
    // sessionStorage에서 선택된 아파트 정보 확인 (검색 결과에서 클릭한 경우)
    const selectApartStr = sessionStorage.getItem("selectApart");
    if (selectApartStr) {
      try {
        const selectedApart: ApartmentItem = JSON.parse(selectApartStr);
        // sessionStorage의 정보를 BaseApartInfo 형식으로 변환
        const searchApartment: BaseApartInfo = {
          id: selectedApart.id || 0,
          name: selectedApart.name,
          region: selectedApart.region,
          location: selectedApart.location,
          address: `${selectedApart.region} ${selectedApart.location}`,
          apartDetailName: selectedApart.name,
          houseSize: 0,
          totalCount: selectedApart.totalUnit || 0,
          moveAbleMonth: 0,
          buildingCount: selectedApart.buildingCount || 0,
          thumbnailFileUrl: selectedApart.thumbnailFileUrl || undefined,
          picture: [selectedApart.thumbnailFileUrl || "/logo.svg"],
        };
        setFilteredApartment(searchApartment);
        // sessionStorage 정리
        sessionStorage.removeItem("selectApart");
        return;
      } catch (error) {
        console.error("sessionStorage 파싱 에러:", error);
      }
    }

    // API에서 조회한 아파트 정보 확인
    if (apiApartment) {
      const apiApart: BaseApartInfo = {
        id: apiApartment.id || 0,
        name: apiApartment.name,
        region: apiApartment.region,
        location: apiApartment.location,
        address: `${apiApartment.region} ${apiApartment.location}`,
        apartDetailName: apiApartment.name,
        houseSize: 0,
        totalCount: apiApartment.totalUnit || 0,
        moveAbleMonth: 0,
        buildingCount: apiApartment.buildingCount || 0,
        thumbnailFileUrl: apiApartment.thumbnailFileUrl || undefined,
        picture: [apiApartment.thumbnailFileUrl || "/logo.svg"],
      };
      setFilteredApartment(apiApart);
      return;
    }

    // userStore에서 아파트 정보가 있는지 확인
    if (
      userApartmentInfo.apartmentId &&
      userApartmentInfo.apartmentName &&
      userApartmentInfo.region
    ) {
      // userStore의 정보를 BaseApartInfo 형식으로 변환
      const userApartment: BaseApartInfo = {
        id: Number(userApartmentInfo.apartmentId) || 0,
        name: userApartmentInfo.apartmentName || "",
        region: userApartmentInfo.region || "",
        location: userApartmentInfo.location || "",
        address: `${userApartmentInfo.region} ${userApartmentInfo.location}`,
        apartDetailName: userApartmentInfo.apartmentName || "",
        houseSize: 0,
        totalCount: 0,
        moveAbleMonth: 0,
        picture: ["/logo.svg"],
      };
      setFilteredApartment(userApartment);
    } else if (id) {
      // userStore에 정보가 없으면 mock 데이터에서 찾기
      const apartment = fetchedApartments.find(
        (item) => item.id === Number(id)
      );

      if (apartment) {
        setFilteredApartment(apartment);
      } else {
        // mock 데이터에도 없으면 기본값으로 아파트 정보 생성
        const defaultApartment: BaseApartInfo = {
          id: Number(id) || 0,
          name: `아파트 #${id}`,
          region: "지역 정보 없음",
          location: "위치 정보 없음",
          address: "주소 정보 없음",
          apartDetailName: `아파트 #${id}`,
          houseSize: 0,
          totalCount: 0,
          moveAbleMonth: 0,
          picture: ["/logo.svg"],
        };
        setFilteredApartment(defaultApartment);
      }
    }
  }, [id, userApartmentInfo, apiApartment]);

  if (!filteredApartment) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        아파트를 로드하는 중입니다...
      </div>
    );
  }

  return (
    <div className={styles["apart__info"]}>
      <Header
        hasBackButton
        title={filteredApartment.apartDetailName}
        hasIcons={
          isLogin ? (
            <img src="/icons/card_bookmark.png" alt="bookmark" width={16} />
          ) : (
            <></>
          )
        }
        onIconClick={clickBookMark}
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
