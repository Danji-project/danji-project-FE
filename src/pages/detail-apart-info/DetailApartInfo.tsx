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
                  onClick={()=>{alert('지금은 사용할 수 없습니다.'); setSelectedTab(selectedTab)}}>공지사항</button>
          <button className={`${selectedTab === 'facilityinfo' ? style['tabbtn-select']:''}`} 
                  onClick={()=>{setSelectedTab('facilityinfo')}}>시설정보</button>
        </div>
      </>
    );
}

const SelectPage = ({selectedTab, apartID, isLogin, apartmentInfo} : {selectedTab : "apartinfo" | "community" | "notify" | "facilityinfo"; apartID:number; isLogin:boolean; apartmentInfo:BaseApartInfo|null|undefined;}) => {
  let content = <ApartInfoPage apartmentInfo={apartmentInfo}/>;

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

const ApartInfoPage = ({apartmentInfo}:{apartmentInfo:BaseApartInfo|null|undefined}) => {
  const user = useUserInfo();
  const testsss :string[] = ["https://placehold.co/70x70","https://placehold.co/70x70","https://placehold.co/70x70","https://placehold.co/70x70","https://placehold.co/70x70"];
  const [isChatting, setIsChatting] = useState<boolean>(false);

  console.log(apartmentInfo);

  return(
    <>
    {
      isChatting?
      <>
        <div className={[style.register, style.dimmed].join(" ")} style={{zIndex:'10', backgroundColor:'white'}}/>
        <div className={[style.register, style.dimmed].join(" ")} style={{zIndex:'10', opacity:'0.2'}}/>
        <div className={style.register} style={{placeItems:'center', display:'flex', justifyContent:'flex-end', flexDirection:'column'}}>
          <div style={{backgroundColor:'white', zIndex:'999', width:'100%', height:'50%', borderRadius:'24px 24px 0px 0px', padding:'40px 0px', textAlign:'center'}}>
            <p style={{color:'#111111', fontWeight:'600', fontSize:'18px'}}>{apartmentInfo?.name}</p>
            <img style={{padding:'28px'}} src='https://placehold.co/180x60'/>
            <p style={{color:'#767676', fontWeight:'400', fontSize:'14px'}}>단지 채팅방에 참여하여</p>
            <p style={{color:'#767676', fontWeight:'400', fontSize:'14px'}}>더 많은 소식을 실시간으로 받아보세요!</p>
            <div style={{display:'flex', padding:'40px 40px 20px 40px'}}>
              <button className={`${style['btn']}`} style={{margin:'0px 10px 0px 0px'}}
                      onClick={()=>setIsChatting(false)}>뒤로가기</button>
              <button className={`${style['bluebtn']}`} style={{margin:'0px 10px 0px 0px'}}
                      >참여하기</button>
            </div>
          </div>
        </div>
      </>
      :
      <>
        <div style={{height:'48px', marginBottom:'20px',display:'flex',flexDirection:'row' ,alignItems:'center', borderRadius:'6px', backgroundColor:"#7996CC"}} >
          <img style={{marginLeft:'8px'}} src={LocationIcon}/>
          <p style={{color:'white', marginLeft:'10px'}}>{user.region}</p>
        </div>
        <div>
          <p style={{fontSize:'16px', fontWeight:'600', marginLeft:'3px'}}>기본 정보</p>
          <div className={style.datacard}>
            <div>
              <p>입주 연도</p>
              <div>
                <p>2015년</p>
              </div>
            </div>
            <div>
              <p>총 세대 수</p>
              <div>
                <p>1,200세대</p>
              </div>
            </div>
            <div>
              <p>건물 유형</p>
              <div>
                <p>고층아파트(최고 35층)</p>
              </div>
            </div>
            <div>
              <p>평형대 구성</p>
              <div>
                <p>24평(300세대)</p>
                <p>34평(500세대)</p>
                <p>45평(200세대)</p>
              </div>
            </div>
            <div>
              <p style={{width:'75px', marginRight:'12px'}}>관리사무소 연락처</p>
              <div>
                <p>02-1234-5678</p>
              </div>
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
          <button className={`${style['btn']}`} onClick={() => setIsChatting(true)}>단지 채팅 참여하기</button>
        </div>

        <div>
          <p style={{fontSize:'16px', fontWeight:'600', marginLeft:'3px'}}>거주 환경</p>
          <div className={style.datacard}>
            <div>
              <p>평균 매매가</p>
              <div>
                <p>34평 기준 22억원</p>
              </div>
            </div>
            <div>
              <p>전세가</p>
              <div>
                <p>12억 원 / 월세 500만원 (보증금3억)</p>
              </div>
            </div>
            <div>
              <p>주차 공간</p>
              <div>
                <p>세대 당 1.5대 (총 1,800대 주차 가능)</p>
              </div>
            </div>
            <div>
              <p>층간 소음</p>
              <div>
                <p>(보통)</p>
              </div>
            </div>
            <div>
              <p>단열 & 냉난방</p>
              <div>
                <p>우수</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p style={{fontSize:'16px', fontWeight:'600', marginLeft:'3px'}}>주변 인프라 & 편의시설</p>
          <div className={style.datacard}>
            <div>
              <p>교통</p>
              <div>
                <p>2호선 삼성역 도보 7분</p>
                <p>버스 정류장 도보 5분</p>
                <p>(간선 341, 472 / 지선 2412)</p>
              </div>
            </div>
            <div>
              <p>주변시설</p>
              <div>
                <p>삼성초, 대치중, 휘문고 (도보 10분 이내)</p>
                <p>이마트 트레이더스 (도보 5분)</p>
                <p>스타벅스 (단지 내)</p>
                <p>강남세브란스병원 (차량 10분)</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p style={{fontSize:'16px', fontWeight:'600', marginLeft:'3px'}}>아파트 시설 & 커뮤니티</p>
          <div className={style.datacard}>
            <div>
              <p>단지 내 시설</p>
              <div>
                <p>피트니스 센터 / 독서실 / 주민 카페</p>
                <p>키즈카페 & 어린이 놀이터 3개소</p>
                <p>실내 골프 연습장</p>
              </div>
            </div>
            <div>
              <p>보안</p>
              <div>
                <p>24시간 경비 & CCTV 120대 운영</p>
                <p>무인 택배함 5개 운영</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p style={{fontSize:'16px', fontWeight:'600', marginLeft:'3px'}}>단지 내 주요 이슈</p>
          <div className={style.datacard}>
            <div>
              <p>최근 공지사항</p>
              <div>
                <p>2025년 3월 1일 ~ 3월 10일 승강기 교체 공사 진행</p>
                <p>입주민 전용 주차 스티커 발급 신청</p>
              </div>
            </div>
            <div>
              <p>입주민 평점</p>
              <div>
                <p>4.5/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </>
    }
    </>
  );
}

const CommunityPage = ({apartID, isLogin}:{apartID:number | null, isLogin:boolean}) => {
  const navigate = useNavigate();
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
                    onClick={(e) => {navigate('/community/feed'); localStorage.setItem('selectFeedID', feed.feedId.toString());}}>
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
          <button onClick={()=>{apartID ? localStorage.setItem('apartmentId', apartID.toString()) : localStorage.removeItem('apartmentId'); navigate('/make/feed');}}><img src={MakeFeedBtn}/></button>
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
      <div>추후 개발 예정입니다.</div>
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