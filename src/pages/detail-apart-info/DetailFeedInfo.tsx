import { useEffect, useState, useRef, type Dispatch, type SetStateAction  } from "react";
import { useNavigate } from "react-router-dom";

import { FeedDetailPost } from "../../model/BaseFeedDetailModel";
import { useGetApartCommunityFeed } from "../../hooks/useApartCommunityFeed";
import { useGetFeedCommentInfo } from "../../hooks/useFeedsComment";

import { useUserInfo } from "../../stores/userStore";
import { CommentBase } from "../../model/BaseCommentModel";

import EyesIcon from '../../assets/Icon/eyesIcon.svg'
import HeartIcon from '../../assets/Icon/heartIcon.svg'
import BookMarkIcon from '../../assets/Icon/bookmarkIcon.svg'
import CommentIcon from '../../assets/Icon/commentIcon.svg'
import DotDotDot from '../../assets/button/IconDotDotDot.svg'

import Spinners from "../../components/common/spinners/Spinners";
import style from "./DetailApartInfo.module.scss"

import Header from "../../layouts/Header";
import { margin } from "@mui/system";

const FeedHeader = ({title, isMine}:{title:string|undefined; isMine:boolean}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null); // 메뉴 참조

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    setMenuPosition({ top: clientY, left: clientX-80 });
    setMenuVisible(true);
    event.stopPropagation();
  };

  const handleMenuItemClick = (item: number) => {
    setMenuVisible(false); // 메뉴 클릭 후 숨기기
    // 메뉴 클릭시 동작으로
  };

  const handleOutsideClick = (event: MouseEvent) => {
    // 메뉴 외부 클릭 시 메뉴를 숨김
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };
  // 외부 클릭 감지
  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [menuVisible]);
  
  
  return(
      <div ref={menuRef}>
        <Header title={title ? title : '오류'} hasBackButton={true}
                onClickHeader={() => {setMenuVisible(false);}}
                hasIcons={
                  isMine ?
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  :
                  <></>
                }
                onIconClick={handleButtonClick}/>

        {
          menuVisible && menuPosition?
                <ul style={{ position:'absolute', zIndex:'999999', 
                              top: menuPosition.top,
                              left: menuPosition.left,
                              backgroundColor:'white', border:'1px solid black',
                              listStyle: 'none', padding: '10px', margin: 0, cursor:'pointer'}}>
                  <li onClick={() => handleMenuItemClick(1)}>수정</li>
                  <li onClick={() => handleMenuItemClick(2)}>삭제</li>
                </ul>
          :
          <></>
        }
      </div>
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

          <div style={{margin:'12px 0px', padding:'12px', fontSize:'14px',backgroundColor:'#F9FBFF', borderRadius:'6px', minHeight:'100px'}}>
            {FeedDetail?.contents}
          </div>
          <div className={`${style['div-imgscroll']}`}>
            {
              FeedDetail?.s3ObjectResponseDtoList.map((element, index)=>(
                <div key={index}>
                  <img style={{width:'70px', height:'70px', borderRadius:'6px'}} src={element.fullUrl}/>
                </div>
              ))
            }
          </div>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <button>
              <img style={{width:'24px', margin:'0px 12px'}} src={HeartIcon}/>
            </button>
            <button>
              <img style={{width:'24px'}} src={BookMarkIcon}/>
            </button>
          </div>
        </div>
        </>
    )
}

const CommentBody = ({Comments, TotalComments}:{Comments:CommentBase[] | undefined; TotalComments:number}) => {
  console.log(TotalComments);  
  return(
      <>
        <p style={{fontWeight:'600', fontSize:'16px'}}>댓글 ({TotalComments})</p>
        {
          Comments?
          <div>

          </div>
          :
          <>
          </>
        }
      </>
    )
}

const DetailFeedInfo = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [feedInfo, setFeedInfo] = useState<FeedDetailPost>();
  const [totalComments, setTotalComments] = useState<number>(0);
  const [comments, setComments] = useState<CommentBase[]>();
  const [feedId, setFeedId] = useState<string | null>(null);
  const {getApartCommunityFeedMutation, isPending} = useGetApartCommunityFeed({feedID:feedId, setPost:setFeedInfo});
  const { getFeedCommentInfoMutation, isCommunityPending } = useGetFeedCommentInfo({feedId:feedId, setFeedComment:setComments, setTotalElements:setTotalComments});

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }

    setFeedId(localStorage.getItem("selectFeedID"));
    localStorage.setItem("selectMenu", 'community');
    getApartCommunityFeedMutation();
    getFeedCommentInfoMutation();
  }, []);

  console.log(feedInfo);

  return (
    <>
      {
        isPending || isCommunityPending?
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
        <div className={`${style["login-div-centerline"]}`} />
        <CommentBody Comments={comments} TotalComments={totalComments}/>
      </div>
      <>
        <div style={{position:'absolute', bottom:'0', width:'87%', zIndex:'9999', height:'52px', margin:'20px 0px 42px 0px'}}>
          <input style={{height:'52px',width:'95%',padding:'10px', borderInline:'none', borderRadius:'6px', border:'1px solid #97BBFF'}} type="text" placeholder={`${user.apartmentName}님, 댓글을 작성해보세요!`}/>
        </div>
      </>
    </>
  );
};

export default DetailFeedInfo;