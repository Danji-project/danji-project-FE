import { useEffect, useState, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import { useSearch } from "../../hooks/useSearch";


import styles from "./RegisterUserApart.module.scss"
import Header from "../../layouts/Header";
import LogoIcon from "../../assets/logo.svg";
import SearchBox from "../../components/common/search-box/search-box";
import InputField from "../../components/common/input-field/InputField";
import { useGetApartmentMutation } from "../../stores/useGetApartmentMutation";
import DeleteIcon from "../../assets/Icon/DeleteIcon.svg";
import type { ApartmentItem } from "../../api/types";
import { useUserApartAdd } from "../../stores/useUserApartAdd";


const RegisterApartHeader = () => {
  return (
    <div>
      <Header title="단지 수정" hasBackButton={true}/>
    </div>
  );
};

const ApartInfoBody = ({Appart, setAppart}:
{
  Appart:ApartmentItem | null | undefined;
  setAppart: Dispatch<SetStateAction<ApartmentItem | null | undefined>>;
}) => {
  const user = useUserInfo();
  const navigate = useNavigate();
  const [dong, setdong] = useState<string>('');
  const [ho, setho] = useState<string>('');
  const [date, setdate] = useState<string>('');
  const [person, setperson] = useState<string>('');
  const [car, setcar] = useState<string[]>([]);
  
  const { AddApart } = useUserApartAdd();

  const selectBtnClick = () => {
    if(Appart)
    {
      user.updateApartInfo(Appart.id ? Appart.id.toString() : Appart.kaptCode, dong, ho, date, person, car);
      AddApart();
      navigate('/my-page');
    }
  };

  useEffect(() => {
    console.log("body");
    console.log(Appart);
  }, [Appart]);

  return (
    <div style={{display:'flex', flexDirection:'column', height:'calc(var(--device-height) - 200px)'}}>
      <div style={{position:'relative', display:'flex', marginTop:'20px', marginBottom:'20px', overflow:'auto', flex:'1'}}>
        <div style={{flex:'1 0 auto', overflowY:'auto'}}>
          {
            Appart ?
            <>
              <p>단지 정보</p>
              <div className={styles["search__danji__link"]}>
                <div className={styles["search__danji__link__thumb"]}>
                  <img
                    src={Appart.thumbnailFileUrl || "/pictures/gangnam_hill_2.jpg"}
                    alt={Appart.name}
                  />
                </div>
                <div className={styles["search__danji__link__info"]}>
                  <h3 className={styles["search__danji__link__info__title"]}>
                    {Appart.name}
                  </h3>
                  <p className={styles["search__danji__link__info__location"]}>
                    {Appart.region} {Appart.location}
                  </p>
                  <p className={styles["search__danji__link__info__detail"]}>
                    {Appart.totalUnit && Appart.buildingCount
                      ? `아파트 ${Appart.totalUnit.toLocaleString()}세대 | 총 ${Appart.buildingCount}동`
                      : "정보 준비중"}
                  </p>
                </div>
                <button className={styles["delete-button"]} onClick={(e) => {setAppart(null); sessionStorage.removeItem("selectApart");}}>
                  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L1 13M1 1L13 13" stroke="#767676"stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <InputField type="text"
                          label="동"
                          name="dong"
                          value={dong}
                          onChange={(e) => { setdong(e.target.value); }}
                          placeholder="ex. 101동"
                          className=""
                        />
              <InputField type="text"
                          label="호"
                          name="ho"
                          value={ho}
                          onChange={(e) => { setho(e.target.value); }}
                          placeholder="ex. 1001호"
                          className=""
                        />
              <InputField type="text"
                          label="입주일"
                          name="date"
                          value={date}
                          onChange={(e) => { setdate(e.target.value); }}
                          placeholder="ex. 2023-01-01"
                          className=""
                        />
              <InputField type="text"
                          label="거주인원"
                          name="person"
                          value={person}
                          onChange={(e) => { setperson(e.target.value); }}
                          placeholder="숫자만 입력하세요."
                          className=""
                        />
              <InputField type="text"
                          label="차량등록"
                          name="car"
                          value={car[0] || ''}
                          onChange={(e) => { setcar([e.target.value]); }}
                          placeholder="ex. 12가 1234"
                          className=""
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
  const [appart, setAppart] = useState<ApartmentItem | null>();
  const { getApartmentMutation } = useGetApartmentMutation({ apartmentID: user.apartment?.id, setApartment: setAppart});


  const [searchText, setSearchText] = useState<string>('');

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
      return;
    }

    // 우선순위 1: 사용자가 이미 등록한 아파트가 있는 경우
    if (user.apartment?.id) {
      getApartmentMutation(); // 이 내부에서 setAppart가 일어난다고 가정
      setIsSelectedApparts(true);
      setIsSearch(false);
    } 
    // 우선순위 2: 세션 스토리지에 저장된 선택된 데이터가 있는 경우
    else {
      const temp = sessionStorage.getItem("selectApart");
      if (temp) {
        const parsedData = JSON.parse(temp);
        setAppart(parsedData); // 여기서 업데이트 예약!
        setIsSearch(false);
      } else {
        setIsSearch(true);
      }
    }
  }, [user.isLogin, user.apartment?.id, navigate]);

  useEffect(() => {
    if (appart) {
      console.log("appart 정보:", appart);
    }
  }, [appart]); // appart가 실제로 바뀔 때만 실행됨

  // 로그인하지 않은 사용자인 경우 아무것도 렌더링하지 않음
  if (!user.isLogin) {
    return null;
  }

  return (
    <>
      <RegisterApartHeader/>
      <div>
        <SearchBox  content={searchText!}
                    placeholder="등록하고자 하는 아파트를 검색하세요"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setSearchText(e.target.value)}
                    onSearch={() => navigate(`/search/result?keyword=${searchText}`)}
                    
        />
      </div>
      <div className={styles["mypage__content"]}>
        {
          isSearch ? 
          <></>
          :
          <ApartInfoBody Appart={appart} setAppart={setAppart}/>
        }
      </div>
    </>
  );
};

export default RegisterMyApart;
