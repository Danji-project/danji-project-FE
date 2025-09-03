import { useEffect, useState, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";

import { FeedDetailPost } from "../../model/BasePostModel";
import { useGetApartCommunityFeed } from "../../hooks/useApartCommunityFeed";

import Spinners from "../../components/common/spinners/Spinners";
import style from "./DetailApartInfo.module.scss"

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
  const [feedInfo, setFeedInfo] = useState<FeedDetailPost>();
  const [feedId, setFeedId] = useState<string | null>(null);
  const {getApartCommunityFeedMutation, isPending} = useGetApartCommunityFeed({feedID:feedId, setPost:setFeedInfo});

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    setFeedId(localStorage.getItem("selectFeedID"));
    localStorage.setItem("selectMenu", 'community');
    getApartCommunityFeedMutation();
  }, []);

  console.log(feedInfo);

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
      <FeedHeader title={feedInfo?.title} isMine={feedInfo ? feedInfo?.isAuthor : false}/>
      <div>
        {feedInfo?.contents}
        <DataBody/>
        <CommentBody/>
      </div>
      <>
        <div style={{position:'absolute', bottom:'0', width:'87%', zIndex:'9999', height:'52px', margin:'20px 0px 42px 0px'}}>
          <input style={{height:'52px',width:'100%',padding:'10px'}} type="text"/>
        </div>
      </>
    </>
  );
};

export default DetailFeedInfo;