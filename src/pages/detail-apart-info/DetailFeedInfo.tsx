import { useEffect, useState, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";

import { FeedDetailPost } from "../../model/BasePostModel";
import { useGetApartCommunityFeed } from "../../hooks/useApartCommunityFeed";

import EyesIcon from '../../assets/Icon/eyesIcon.png'
import HeartIcon from '../../assets/Icon/heartIcon.png'
import BookMarkIcon from '../../assets/Icon/bookmarkIcon.png'
import CommentIcon from '../../assets/Icon/commentIcon.png'

import Spinners from "../../components/common/spinners/Spinners";
import style from "./DetailApartInfo.module.scss"

import Header from "../../layouts/Header";
import { margin } from "@mui/system";

const FeedHeader = ({title, isMine}:{title:string|undefined; isMine:boolean}) => {
    return(
        <>
            <Header title={title ? title : '오류'} hasBackButton={true} hasRightButton={isMine}/>
        </>
    )
}

const DataBody = ({FeedDetail} : {FeedDetail : FeedDetailPost | undefined;}) => {
  let formattedDate = '';
  useEffect(() => {
    if(FeedDetail)
    {
      const date = new Date(FeedDetail.createdAt);
  
      // 날짜 형식을 'YY.MM.DD'로 변환
      formattedDate = date.toLocaleDateString('ko-KR', {
          year: '2-digit', // 2자리 연도
          month: '2-digit', // 2자리 월
          day: '2-digit' // 2자리 일
      }).replace(/\./g, '.').substring(0,10); // 구분자를 '.'으로 변경
    }

  }, [FeedDetail]);



    return(
        <>
        <div>
          <p style={{fontWeight:'600', fontSize:'16px', margin:'20px 0px'}}>{FeedDetail?.title}</p>
          <div className={`${style.Container}`}>
            <div className={`${style.leftContainer}`}>
              <p style={{fontWeight:'600'}}>작성자</p>
              <p style={{margin:'0px 4px'}}>{FeedDetail?.feedMemberResponseDto.nickname ? FeedDetail.feedMemberResponseDto.nickname : '익명'}</p>
              <p>{formattedDate}</p>
            </div>
            <div className={`${style.rightContainer}`}>
              <img src={EyesIcon}/>
              <p>{FeedDetail?.viewCount}</p>
              <img src={HeartIcon}/>
              <p>{FeedDetail?.reactionCount}</p>
              <img src={BookMarkIcon}/>
              <p>{FeedDetail?.bookmarkCount}</p>
              <img src={CommentIcon}/>
              <p>{FeedDetail?.commentCount}</p>
            </div>
          </div>

          <div style={{margin:'12px 0px', padding:'12px', fontSize:'14px',backgroundColor:'#F9FBFF', borderRadius:'6px'}}>
            {FeedDetail?.contents}
          </div>
          <div>
            {
              FeedDetail?.s3ObjectResponseDtoList.map((element, index)=>(
                <div key={index}>
                  <img style={{width:'70px', height:'70px', borderRadius:'6px'}} src={element.fullUrl}/>
                </div>
              ))
            }
          </div>
        </div>
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
        <DataBody FeedDetail={feedInfo}/>
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