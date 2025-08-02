import { useEffect, useState, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import { BaseApartInfo } from "../../model/BaseApartInfoModel";
import { useSearch } from "../../hooks/useSearch";

import { useGetApartmentMutation } from "../../hooks/useGetApartment";

import styles from "./registerMyApartInfo.module.scss"
import Header from "../../layouts/Header";
import ApartList from "../../components/apart-list/apart-list";
import LogoIcon from "../../assets/logo.svg";
import SearchBox from "../../components/common/search-box/search-box";
import InputFiled from "../../components/input-filed/InputField";

const RegisterApartHeader = ({isSearch, setFetchedAparts, searchText, setSearchText, search}:
{
  isSearch:boolean; 
  setFetchedAparts: Dispatch<SetStateAction<BaseApartInfo[] | undefined>>;
  searchText:string;
  setSearchText: Dispatch<SetStateAction<string>>;
  search: () => void;
}) => {
  

  return (
    <div>
      {/* {
        isSearch ?
          <Header title={searchText} hasBackButton={true} hasSearchBox={true} onChangeText={(e)=>{setSearchText(e.target.value);}} onClickButton={search}/>
        :
        <>
          <Header title="단지 수정" hasBackButton={true}/>
        </>
      } */}
      <Header title="단지 수정" hasBackButton={true}/>
    </div>
  );
};

const ApartListBody = ({Appart, setAppart, setIsSearch, setSearchText}:
{
  Appart:BaseApartInfo[]; 
  setAppart: Dispatch<SetStateAction<BaseApartInfo | null | undefined>>;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
}) => {

  const [selectedApartmentID, setSelectedApartmentID] = useState<string | undefined>(undefined);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedApartmentID(event.target.value);
  };

  const selectBtnClick = () => {
    setSearchText("");
    setIsSearch(false);
    //setAppart(Appart.find(apart => apart.apartID === selectedApartmentID));
  };

  return (
    <div style={{display:'flex', flexDirection:'column', height:'calc(var(--device-height) - 200px)'}}>
      <p style={{marginTop:'20px'}}>검색 결과 {Appart.length}건</p>
      <div style={{position:'relative', display:'flex', marginTop:'12px', marginBottom:'20px', overflow:'auto', flex:'1'}}>
        <div style={{flex:'1 0 auto', overflowY:'auto'}}>
          {
            Appart.map((element) => (
              <div key={element.apartID}>
                <input type="radio" name="apartmentlist" value={element.apartID}
                        checked={selectedApartmentID == element.apartID}
                        onChange={handleChange}>
                  <ApartList
                    key={element.apartID}
                    element={element}
                  />
                </input>
              </div>
            ))
          }
        </div>
      </div>
      <button className={`${styles['search__btn']}`} onClick={selectBtnClick}>선택</button>
    </div>
  );
};

const ApartInfoBody = ({Appart, setIsSearch, searchText, setSearchText}:
{
  Appart:BaseApartInfo | null | undefined; 
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  searchText:string;
  setSearchText: Dispatch<SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const [dong, setdong] = useState<string>('');
  const [ho, setho] = useState<string>('');
  const [date, setdate] = useState<string>('');
  const [person, setperson] = useState<string>('');
  const [car, setcar] = useState<string[]>([]);

  const selectBtnClick = () => {
    navigate('/my-page');
  };

  return (
    <div style={{display:'flex', flexDirection:'column', height:'calc(var(--device-height) - 200px)'}}>
      {/* <div>
        <SearchBox  content={searchText}
                    placeholder="등록하고자 하는 아파트를 검색하세요"
                    onChange={(e)=>{setSearchText(e.target.value)}}
                    onSearch={()=>{setIsSearch(true);}}/>
      </div> */}
      <div style={{position:'relative', display:'flex', marginTop:'20px', marginBottom:'20px', overflow:'auto', flex:'1'}}>
        <div style={{flex:'1 0 auto', overflowY:'auto'}}>
          {
            Appart ?
            <>
              <p>단지 정보</p>
              <ApartList key={Appart.apartID} element={Appart}/>
              <InputFiled type="text"
                          label="동"
                          name="dong"
                          id="dong"
                          value={dong}
                          onChange={(e) => { setdong(e.target.value); }}
                          placeholder="ex. 101동"
                        />
              <InputFiled type="text"
                          label="호"
                          name="ho"
                          id="ho"
                          value={ho}
                          onChange={(e) => { setho(e.target.value); }}
                          placeholder="ex. 1001호"
                        />
              <InputFiled type="text"
                          label="입주일"
                          name="date"
                          id="date"
                          value={date}
                          onChange={(e) => { setdate(e.target.value); }}
                          placeholder="ex. 101동"
                        />
              <InputFiled type="text"
                          label="거주인원"
                          name="person"
                          id="person"
                          value={person}
                          onChange={(e) => { setperson(e.target.value); }}
                          placeholder="숫자만 입력하세요."
                        />
              <InputFiled type="text"
                          label="차량등록"
                          name="car"
                          id="car"
                          value={car[0]}
                          onChange={(e) => {  }}
                          placeholder="ex. 12가 1234"
                        />
            </>
            :
            <div style={{height:'100%',textAlign:'center', alignContent:'center', justifyContent:'center', margin:'0 auto'}}>
              <img src={LogoIcon} style={{width:'110px', opacity:'0.7'}}/>
              <p>등록할 단지가 없습니다.</p>
              <p>단지를 검색해보세요!</p>
            </div>
          }
        </div>
      </div>
      <button className={`${styles['search__btn']}`} onClick={selectBtnClick}>완료</button>
    </div>
  );
};

const RegisterMyApart = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isSelectedApparts, setIsSelectedApparts] = useState<boolean>(false);
  const [apparts, setApparts] = useState<BaseApartInfo | null>();
  const { getApartmentMutation, isPending } = useGetApartmentMutation({ apartmentID: user.apartmentID, setApartment: setApparts});
  const [fetchedAparts, setFetchedAparts] = useState<BaseApartInfo[] | undefined>([]);


  const [searchText, setSearchText] = useState<string>('');
  const serchmutation = useSearch({ searchText: searchText, setApartments:setFetchedAparts });

  const search = () => {
    serchmutation.Search();
    setIsSearch(true);
  };

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }

    if(user.apartmentID){
      getApartmentMutation();
      setIsSelectedApparts(true);
    }
  }, [user, navigate]);

  // 로그인하지 않은 사용자인 경우 아무것도 렌더링하지 않음
  if (!user.isLogin) {
    return null;
  }

  return (
    <>
      <RegisterApartHeader isSearch={isSearch} setFetchedAparts={setFetchedAparts} searchText={searchText} setSearchText={setSearchText} search={search}/>
      <div>
        <SearchBox  content={searchText}
                    placeholder="등록하고자 하는 아파트를 검색하세요"
                    onChange={(e)=>{setSearchText(e.target.value)}}
                    onSearch={search}/>
      </div>
      <div className={styles["mypage__content"]}>
        {
          isSearch ? 
          <ApartListBody Appart={fetchedAparts? fetchedAparts : []} setIsSearch={setIsSearch} setAppart={setApparts} setSearchText={setSearchText}/>
          :
          <ApartInfoBody Appart={apparts} setIsSearch={setIsSearch} searchText={searchText} setSearchText={setSearchText}/>
        }
      </div>
    </>
  );
};

export default RegisterMyApart;
