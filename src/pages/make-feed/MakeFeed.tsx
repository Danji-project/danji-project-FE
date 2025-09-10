import { useEffect, useState, useRef, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";

import { useUserInfo } from "../../stores/userStore";
import InputField from "../../components/common/input-field/InputField";

import Header from "../../layouts/Header";

const FeedHeader = () => {
  return(
      <div>
        <Header title={'글쓰기'} hasBackButton={true}
                onClickHeader={() => {}}
                hasIcons={<>등록</>}/>
      </div>
    )
}

const BodyData = () => {
    const [title, setTitle] = useState<string>('');

  // 외부 클릭 감지
  useEffect(() => {
  }, []);
  
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value,);
    };
  
  return(
    <>
      <div>
        <InputField
          label="제목"
          placeholder="제목을 입력해주세요."
          className=""
          type="text"
          name="makefeed-title"
          value={title}
          onChange={titleChange}
        />
        <textarea placeholder="내용을 입력해주세요."
                style={{resize:'none', width:'100%', height:'292px', padding:'15px 12px', verticalAlign:'top', textAlign:'left', lineHeight:'normal'}}/>
      </div>
    </>
    )
}


const MakeFeed = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [feedApartID, setFeedApartID] = useState<string|null>('');

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }

    setFeedApartID(localStorage.getItem("apartmentId"));
  }, []);

  return (
    <>
      {/* {
        isPending?
        <>
          <div className={[style.register, style.dimmed].join(" ")}>
            <Spinners />
          </div>
        </>
        :
        <></>
      } */}
      <FeedHeader/>
      <BodyData/>
    </>
  );
};

export default MakeFeed;