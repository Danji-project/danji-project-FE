import { useEffect, useState, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";

import Header from "../../layouts/Header";
import ComboBox from "../../components/common/combobox/ComboBox";
import Spinners from "../../components/common/spinners/Spinners";
import PostSummary from "../../components/post-summary/PostSummary";
import style from "./DetailApartInfo.module.scss"

import LocationIcon from '../../assets/Icon/LocationIconBlue.png';
import MakeFeedBtn from '../../assets/Icon/MakeFeedBtnIcon.svg'

import { useGetApartCommunityLookup } from "../../hooks/useApartCommunityLookup";
import { useGetApartmentMutation } from "../../hooks/useGetApartment";
import { useGetFeedDetailInfo } from "../../hooks/useFeedDetailInfo";
import { BasePost } from "../../model/BasePostModel";
import { BaseApartInfo } from "../../model/BaseApartInfoModel";

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

const SelectPage = ({selectedTab, apartID, isLogin, apartmentInfo} : {selectedTab : "apartinfo" | "community" | "notify" | "facilityinfo"; apartID:number; isLogin:boolean; apartmentInfo:BaseApartInfo|null;}) => {
  let content = <ApartInfoPage/>;

  switch(selectedTab)
  {
    case "apartinfo":
      content = <ApartInfoPage apartmentInfo={apartmentInfo}/>;
      break;
    case "community":
      content = <CommunityPage apartID={apartID} isLogin={isLogin}/>;
      break;
    case "notify":
      content = <NotifyPage/>;
      break;
    case "facilityinfo":
      content = <FacilityinfoPage/>;
      break;
  }

  return(
    <div style={{marginTop:'20px', marginBottom:'20px'}}>
      {content}
    </div>
  )
}

const ApartInfoPage = ({apartmentInfo}:{apartmentInfo:BaseApartInfo|null}) => {
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
            <p>{apartmentInfo?.totalUnit}</p>
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
            testsss.map((element, index)=>(
              <div key={index}>
                <img src={element}/>
              </div>
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

const CommunityPage = ({apartID, isLogin}:{apartID:number | null, isLogin:boolean}) => {
  const [selectedItem, setSelectedItem] = useState<string>('전체');
  const [selectedSortOption, setSelectedSortOption] = useState<'ALL' | 'POPULAR' | 'LATEST'>('ALL');
  const options = ['전체', '최신순', '인기순'];
  const [postSummarys, setPostSummarys] = useState<BasePost[]>([]);
  const { getApartCommunityLookupMutation, isPending }= useGetApartCommunityLookup({apartmentID : apartID, sort : selectedSortOption, setPostSummary : setPostSummarys});
  
  const updateCommunity = ({data}:{data:string}) => {
    console.log(data);
    if(data == options[0])
      setSelectedSortOption('ALL');
    else if(data == options[1])
      setSelectedSortOption('POPULAR');
    else if(data == options[2])
      setSelectedSortOption('LATEST');

    getApartCommunityLookupMutation();
  }

  useEffect(() => {
    updateCommunity({data:selectedItem});
  }, [apartID]);

  console.log("사용자 로그인 여부 : " + isLogin);

  return(
    <>
    {
      isPending?
      <>
        <div className={[style.register, style.dimmed].join(" ")}>
          <Spinners />
        </div>
      </>
      :
      <></>
    }
      <div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <p>{selectedItem}</p>
          <ComboBox options={options} placeholder="" selectItem={selectedItem} 
                    setSelectOption={(e) => {setSelectedItem(e); updateCommunity({data:e.toString()})}}/>
        </div>
        <div style={{position:'relative', height:'425px', overflowY:'auto', marginTop:'10px'}}>
          {
            postSummarys.map((feed, index)=>(
              <div key={`${index}`} style={{borderBottom:'1px solid #EDEDED'}}>
                <li
                    style={{ padding: '8px', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                    onClick={(e) => {}}>
                  <PostSummary element={feed} onClick={()=>{}}/>
                </li>
              </div>
            ))
          }
        </div>
      </div>
      {
        isLogin ? 
        <div style={{position:'absolute', right:'20px', bottom:'20px'}}>
          <button><img src={MakeFeedBtn}/></button>
        </div>
        :
        <></>
      }
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
  const [apartsID, setApartID] = useState<number | null>();
  const [selectedTab, setSelectedTab] = useState<"apartinfo" | "community" | "notify" | "facilityinfo">("apartinfo");
  const [apartment, setApartment] = useState<BaseApartInfo | null>();
  const {getApartmentMutation, isPending} = useGetApartmentMutation({apartmentID:apartsID, setApartment:setApartment});

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
      let menu = localStorage.getItem("selectMenu");
      console.log(menu);
      setSelectedTab(menu == 'community' || menu == 'notify' || menu == 'facilityinfo' ? menu : 'apartinfo');
      
      let apartmentId = localStorage.getItem("selectApart");
      const id = Number(apartmentId);
      console.log(id);
      setApartID(id);

  }, []);

  useEffect(() => {
    if (apartsID !== null) {
      getApartmentMutation();
    }
  }, [apartsID]); // apartsID가 변경될 때마다 호출


  return (
    <>
      {
        isPending?
        <>
          <div className={[style.register, style.dimmed].join(" ")}>
            <Spinners />
          </div>
        </>
        :
        <></>
      }
      <DetailApartHeader apartName={apartment ? apartment.name : isPending ? '로딩중': '오류'}/>
      <TabButton selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {
        apartsID?
        <SelectPage selectedTab={selectedTab} apartID={apartsID} isLogin={user.isLogin} apartmentInfo={apartment}/>
        :<></>
      }
    </>
  );
};

export default DetailApartInfo;