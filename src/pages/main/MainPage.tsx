import { useState, useEffect } from "react";
import { type Dispatch, type SetStateAction } from "react";
import { useContext } from "react";
import { useUserInfo } from "../../stores/userStore";
import { useSearch } from "../../hooks/useSearch";
import { BaseApartInfo } from "../../model/BaseApartInfoModel";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import SearchBox from "../../components/common/search-box/search-box";
import ApartCard from "../../components/apart-card/apart-card";
import { IconButton } from "../../components/common/Icon-button/Icon-button";

import styles from "./MainPage.module.scss";
import MenuIcon from "../../assets/button/MenuBtn.svg";
import IconUser from "../../assets/button/IconUser.png"
import IconStar from "../../assets/button/IconStar.png"
import IconMsg from "../../assets/button/IconMsg.png"
import IconReceipt from "../../assets/button/IconReceipt.png"
import IconGraph from "../../assets/button/IconGraph.png"
import IconDanger from "../../assets/button/IconDanger.png"
import IconGamepad from "../../assets/button/IconGamepad.png"
import IconChart from "../../assets/button/IconChart.png"

const MainPageHeader = ({sideMenuOpen}:{sideMenuOpen:Dispatch<SetStateAction<boolean>>;}) => {
  const user = useUserInfo();

  return (
    <div style={{height:'56px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <h1 style={{fontWeight:'600', fontSize:'20px'}}>DANJITALK</h1>
      {
        user.isLogin?
        <button onClick={()=>{sideMenuOpen(true);}}><img src={MenuIcon}/></button>
        :
        <Link className={`${styles["login-blue-small-text"]}`} to="/login">Login</Link>
      }
    </div>
  );
};

const ContentBody = () => {
  const navigate = useNavigate();

  const [apparts, setApparts] = useState<BaseApartInfo[]>([]);
  const [newapparts, setNewApparts] = useState<BaseApartInfo[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const serchmutation = useSearch({searchText: searchText});
  const user = useUserInfo();

  const serch = () => {
    serchmutation.Search();
  }

  const bookmarked = () => {
    console.log(user.isLogin);
  }

  const showDetailInfo = () => {
    // 시설 정보 자세히 보여주는 화면으로 이동 하도록 하면 될듯..?
  }

  useEffect(() => {
    // 예시: 목업 데이터
    // 이후에는 목업 대신 실제 데이터를 가져올 수 있도록 수정해야할 것.
    const fetchedAparts: BaseApartInfo[] = [
      {apartID:1, locatin:'강남', apartName:'힐스', apartDetailName:'강남 힐스', houseSize:32, totalHouseHolds:1200, moveVailableMonth:2, picture:'https://placehold.co/150x180', isuseBookmark:user.isLogin, bookmark:false},
      {apartID:2, locatin:'강남', apartName:'힐스', apartDetailName:'강남 힐스', houseSize:32, totalHouseHolds:1200, moveVailableMonth:2, picture:'https://placehold.co/150x180', isuseBookmark:user.isLogin, bookmark:false},
      {apartID:3, locatin:'강남', apartName:'힐스', apartDetailName:'강남 힐스', houseSize:32, totalHouseHolds:1200, moveVailableMonth:2, picture:'https://placehold.co/150x180', isuseBookmark:user.isLogin, bookmark:false},
      {apartID:4, locatin:'강남', apartName:'힐스', apartDetailName:'강남 힐스', houseSize:32, totalHouseHolds:1200, moveVailableMonth:2, picture:'https://placehold.co/150x180', isuseBookmark:user.isLogin, bookmark:false},
    ];
    setApparts(fetchedAparts);

    if(user.isLogin)
    {
      const fetchedUsers: BaseApartInfo[] = [
      {apartID:1, locatin:'역삼', apartName:'래미안', apartDetailName:'래미안 루체라', houseSize:40, totalHouseHolds:800, moveVailableMonth:6, picture:'https://placehold.co/150x180', isuseBookmark:user.isLogin, bookmark:false},
      {apartID:2, locatin:'역삼', apartName:'래미안', apartDetailName:'래미안 루체라', houseSize:40, totalHouseHolds:800, moveVailableMonth:6, picture:'https://placehold.co/150x180', isuseBookmark:user.isLogin, bookmark:false},
    ];
      setNewApparts(fetchedUsers);
    }
  }, []);

  return(
    <>
      <div>
        <SearchBox content={searchText} placeholder="궁금한 단지를 검색해보세요!"
                   onSearch={serch} onChange={(e) => {setSearchText(e.target.value)}}/>
        {
          user.isLogin?
            <div style={{marginTop:'20px', marginBottom:'8px', display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
              <IconButton text="단지정보" imageurl={IconChart} onClick={() => {console.log("단지정보");  navigate("/");}}/>
              <IconButton text="커뮤니티" imageurl={IconGamepad} onClick={() => {console.log("커뮤니티");  navigate("/");}}/>
              <IconButton text="공지사항" imageurl={IconDanger} onClick={() => {console.log("공지사항");  navigate("/");}}/>
              <IconButton text="시설정보" imageurl={IconGraph} onClick={() => {console.log("시설정보");  navigate("/");}}/>
              <IconButton text="마이페이지" imageurl={IconUser} onClick={() => {console.log("마이페이지");  navigate("/");}}/>
              <IconButton text="즐겨찾기" imageurl={IconStar} onClick={() => {console.log("즐겨찾기");  navigate("/");}}/>
              <IconButton text="채팅" imageurl={IconMsg} onClick={() => {console.log("채팅");  navigate("/");}}/>
              <IconButton text="방문차량등록" imageurl={IconReceipt} onClick={() => {console.log("방문차량등록");  navigate("/");}}/>
            </div>
          :
          <></>
        }

        {
          user.isLogin?
            <div style={{marginTop:'20px', marginBottom:'8px'}}>
              <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
                <p style={{fontSize:'18px', fontWeight:'600'}}>신축아파트 분양정보</p>
                <button>더보기</button>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
                {newapparts.map((element) => (<ApartCard key={element.apartID} element={element} onBookMarked={bookmarked} onClickCard={showDetailInfo}/>))}
              </div>
            </div>
          :
          <></>
        }

        <div style={{marginTop:'20px', marginBottom:'8px'}}>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
            <p style={{fontSize:'18px', fontWeight:'600'}}>요즘 뜨는 아파트</p>
            <button>더보기</button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
            {apparts.map((element) => (<ApartCard key={element.apartID} element={element} onBookMarked={bookmarked} onClickCard={showDetailInfo}/>))}
          </div>
        </div>
      </div>
    </>
  )
}

export const MainPage = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <>
      <div style={{position:'relative'}}>
        <MainPageHeader sideMenuOpen={setIsSideMenuOpen}/>
        <ContentBody/>
        {
          isSideMenuOpen?
          <div className={`${styles['sidemenu-div-outline']}`} onClick={()=>{setIsSideMenuOpen(false);}}>
            <div className={`${styles['sidemenu-div-maxline']}`}>
              <div className={`${styles['sidemenu-div-content']}`}>
                <div style={{ textAlign:'right'}}>
                  <button className={`${styles['sidemenu-button']}`} onClick={()=>{setIsSideMenuOpen(false);}}/>
                </div>
                <p><Link to="/">단지정보</Link></p>
                <p><Link to="/">커뮤니티</Link></p>
                <p><Link to="/">공지사항</Link></p>
                <p><Link to="/">Login</Link></p>
                <p><Link to="/">단지 즐겨찾기</Link></p>
                <p><Link to="/">마이페이지</Link></p>
                <p><Link to="/">채팅</Link></p>
                <p><Link to="/">방문차량등록</Link></p>
                <p><Link to="/">내 예약 정보</Link></p>
                <p><Link to="/">단지 등록</Link></p>
                <p><Link to="/">로그아웃</Link></p>
              </div>
            </div>
          </div>
          :
          <></>
        }
      </div>
    </>
  );
};
