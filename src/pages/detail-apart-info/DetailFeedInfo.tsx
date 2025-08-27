import { useEffect, useState, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";

import { FeedDetailPost } from "../../model/BasePostModel";

import Header from "../../layouts/Header";

const FeedHeader = ({title, isMine}:{title:string|undefined; isMine:boolean}) => {
    return(
        <>
            <Header title={title ? title : '오류'} hasBackButton={true} hasRightButton={isMine}/>
        </>
    )
}

const DataBody = () => {
    return(
        <>
        </>
    )
}

const CommentBody = () => {
    return(
        <>
        </>
    )
}

const DetailFeedInfo = () => {
  const navigate = useNavigate();
  const [feedInfo, setFeedInfo] = useState<FeedDetailPost>();

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
      let feedId = localStorage.getItem("selectFeedID");
  }, [navigate]);

  return (
    <>
      <FeedHeader title={feedInfo?.title} isMine={feedInfo ? feedInfo?.isAuthor : false}/>
      <div>
        <DataBody/>
        <CommentBody/>
      </div>
      <div>
        <input type="text"/>
      </div>
    </>
  );
};

export default DetailFeedInfo;