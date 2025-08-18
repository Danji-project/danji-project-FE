import { useEffect, useState, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";

import Header from "../../layouts/Header";
import style from "./DetailApartInfo.module.scss"

import LocationIcon from '../../assets/Icon/LocationIconBlue.png';

const DetailApartHeader = ({apartName}:{apartName : string}) => {
  return (
    <div>
      <Header title={apartName} hasBackButton={true}/>
    </div>
  );
};

const TabButton = ({selectedTab, setSelectedTab}:{
  selectedTab : "apartinfo" | "community" | "notify" | "facilityinfo"; 
  setSelectedTab: Dispatch<SetStateAction<"apartinfo" | "community" | "notify" | "facilityinfo">>;}) => {
    return(
      <>
        <div className={style['div-tabbtn']}>
          <button className={`${selectedTab === 'apartinfo' ? style['tabbtn-select']:''}`} 
                  onClick={()=>{setSelectedTab('apartinfo')}}>단지정보</button>
          <button className={`${selectedTab === 'community' ? style['tabbtn-select']:''}`} 
                  onClick={()=>{setSelectedTab('community')}}>커뮤니티</button>
          <button className={`${selectedTab === 'notify' ? style['tabbtn-select']:''}`} 
                  onClick={()=>{setSelectedTab('notify')}}>공지사항</button>
          <button className={`${selectedTab === 'facilityinfo' ? style['tabbtn-select']:''}`} 
                  onClick={()=>{setSelectedTab('facilityinfo')}}>시설정보</button>
        </div>
      </>
    );
}

const SelectPage = ({selectedTab} : {selectedTab : "apartinfo" | "community" | "notify" | "facilityinfo"}) => {
  let content = <ApartInfoPage/>;

  switch(selectedTab)
  {
    case "apartinfo":
      content = <ApartInfoPage/>;
      break;
    case "community":
      content = <CommunityPage/>;
      break;
    case "notify":
      content = <NotifyPage/>;
      break;
    case "facilityinfo":
      content = <FacilityinfoPage/>;
      break;
  }

  return(
    <>
    {content}
    </>
  )
}

const ApartInfoPage = () => {
  const user = useUserInfo();


  const testsss :string[] = ["https://placehold.co/70x70","https://placehold.co/70x70","https://placehold.co/70x70","https://placehold.co/70x70","https://placehold.co/70x70"];
  
  return(
    <>
      <div style={{height:'48px', display:'flex',flexDirection:'row' ,alignItems:'center', borderRadius:'6px', backgroundColor:"#7996CC"}} >
        <img style={{marginLeft:'8px'}} src={LocationIcon}/>
        <p style={{color:'white', marginLeft:'10px'}}>{user.region}</p>
      </div>
      <div>
        <p>기본 정보</p>
        <div>
          <div>
            <p>입주 연도</p>
            <p>{}</p>
          </div>
          <div>
            <p>총 세대 수</p>
            <p>{}</p>
          </div>
          <div>
            <p>건물 유형</p>
            <p>{}</p>
          </div>
          <div>
            <p>평형대 구성</p>
            <p>{}</p>
          </div>
          <div>
            <p>관리사무소 연락처</p>
            <p>{}</p>
          </div>
        </div>
        <div className={`${style['div-imgscroll']}`}>
          {
            testsss.map((element)=>(
              <img src={element}/>
            ))
          }
        </div>
        <button className={`${style['btn']}`}>단지 채팅 참여하기</button>
      </div>

      <div>
        <p>거주 환경</p>
        <div>
          <div>
            <p>평균 매매가</p>
            <p>{}</p>
          </div>
          <div>
            <p>전세가</p>
            <p>{}</p>
          </div>
          <div>
            <p>주차 공간</p>
            <p>{}</p>
          </div>
          <div>
            <p>층간 소음</p>
            <p>{}</p>
          </div>
          <div>
            <p>단열 & 냉난방</p>
            <p>{}</p>
          </div>
        </div>
      </div>
      <div>
        <p>주변 인프라 & 편의시설</p>
        <div>
          <div>
            <p>교통</p>
            <p>{}</p>
          </div>
          <div>
            <p>주변시설</p>
            <p>{}</p>
          </div>
        </div>
      </div>
      <div>
        <p>아파트 시설 & 커뮤니티</p>
        <div>
          <div>
            <p>단지 내 시설</p>
            <p>{}</p>
          </div>
          <div>
            <p>보안</p>
            <p>{}</p>
          </div>
        </div>
      </div>
      <div>
        <p>단지 내 주요 이슈</p>
        <div>
          <div>
            <p>최근 공지사항</p>
            <p>{}</p>
          </div>
          <div>
            <p>입주민 평점</p>
            <p>{}/5.0</p>
          </div>
        </div>
      </div>
    </>
  );
}

const CommunityPage = () => {
  return(
    <>
      <div>아파트 커뮤니티 페이지</div>
    </>
  );
}

const NotifyPage = () => {
  return(
    <>
      <div>공지사항 페이지</div>
    </>
  );
}

const FacilityinfoPage = () => {
  return(
    <>
      <div>시설 정보 페이지</div>
    </>
  );
}

const DetailApartInfo = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [selectedTab, setSelectedTab] = useState<"apartinfo" | "community" | "notify" | "facilityinfo">("apartinfo");

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <DetailApartHeader apartName={user.apartmentName ? user.apartmentName : '오류'}/>
      <TabButton selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <SelectPage selectedTab={selectedTab}/>
    </>
  );
};

export default DetailApartInfo;