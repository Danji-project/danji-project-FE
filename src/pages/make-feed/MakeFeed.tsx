import { useEffect, useState, useRef, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";

import { useUserInfo } from "../../stores/userStore";
import { useMakeFeedMutation } from "../../hooks/useMakeFeed";

import InputField from "../../components/common/input-field/InputField";
import Header from "../../layouts/Header";
import { FeedDetailPost } from "../../model/BaseFeedDetailModel";

import styles from './MakeFeed.module.scss';
import Spinners from "../../components/common/spinners/Spinners";

const FeedHeader = ({useMakeFeed}:{useMakeFeed:Function}) => {
  return(
      <div>
        <Header title={'글쓰기'} hasBackButton={true}
                onClickHeader={() => {useMakeFeed();}}
                hasIcons={<>등록</>}/>
      </div>
    )
}

const BodyData = ({setFeed}:{setFeed:FeedDetailPost}) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContents] = useState<string>('');

  // 외부 클릭 감지
  useEffect(() => {
  }, []);
  
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      setFeed.title = e.target.value;
    };

    const contentChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
      setContents(e.target.value);
      setFeed.contents = e.target.value;
    }
  
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
                value={content} onChange={contentChange}
                style={{resize:'none', width:'100%', height:'292px', padding:'15px 12px', verticalAlign:'top', textAlign:'left', lineHeight:'normal'}}/>
      </div>
    </>
    )
}


const MakeFeed = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [feedApartID, setFeedApartID] = useState<string|null>('');
  const [feedData, setFeedData] = useState<FeedDetailPost>(new FeedDetailPost(null));
  const { useMakeFeed, isPending }= useMakeFeedMutation({appartID: feedApartID, feedData:feedData});

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }

    setFeedApartID(localStorage.getItem("apartmentId"));
  }, []);

  return (
    <>
      {
        isPending?
        <>
          <div className={[styles.register, styles.dimmed].join(" ")}>
            <Spinners />
          </div>
        </>
        :
        <></>
      }
      <FeedHeader useMakeFeed={useMakeFeed}/>
      <BodyData setFeed={feedData}/>
    </>
  );
};

export default MakeFeed;