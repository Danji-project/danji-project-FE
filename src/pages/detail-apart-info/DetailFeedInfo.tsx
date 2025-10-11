import React from 'react';
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
import SendMsgIcon from '../../assets/Icon/SendMsgIcon.svg';

import Spinners from "../../components/common/spinners/Spinners";
import style from "./DetailApartInfo.module.scss"

import Header from "../../layouts/Header";
import CommentBox from '../../components/common/comment-box/CommentBox';

const FeedHeader = ({title, isMine, feedId, setFeedInfo}:{title:string|undefined; isMine:boolean; feedId:string|null; setFeedInfo:Dispatch<SetStateAction<FeedDetailPost>>}) => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null); // 메뉴 참조
  const {useDeleteFeedDetailInfoMutation} = useGetApartCommunityFeed({feedID:feedId, setPost:setFeedInfo});
  
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { clientX } = event;
    setMenuPosition({ top: 110, left: (clientX - 70 > 315 ? 315 : clientX - 70 )});
    setMenuVisible(true);
    event.stopPropagation();
  };

  const handleMenuItemClick = (item: number) => {
    setMenuVisible(false); // 메뉴 클릭 후 숨기기
    // 메뉴 클릭시 동작으로
    if(item === 1)
    {
      console.log("click change feed");
      feedId ? localStorage.setItem("changeFeed", feedId) : localStorage.removeItem("changeFeed");
      navigate("/make/feed", {replace:true});
    }
    else if(item === 2)
    {
      useDeleteFeedDetailInfoMutation();
      console.log("click delete feed");
    }
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
                              left: menuPosition.left, width:'70px',
                              backgroundColor:'white', border:'1px solid #EDEDED', borderRadius:'4px',
                              listStyle: 'none', padding: '10px', margin: 0, cursor:'pointer'}}>
                  <li style={{fontSize:'15px', width:'49px', borderBottom:'1px solid #EDEDED', padding:'0px 8px 8px 8px', textAlign:'center', verticalAlign:'center'}} onClick={() => handleMenuItemClick(1)}>수정</li>
                  <li style={{fontSize:'15px', width:'49px', padding:'8px 8px 0px 8px', textAlign:'center', verticalAlign:'center'}} onClick={() => handleMenuItemClick(2)}>삭제</li>
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


  console.log(FeedDetail?.contents);
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
            {FeedDetail?.contents.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < FeedDetail?.contents.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
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

const CommentBody = ({Comments, TotalComments, setPerentID, setCommentId, setComment, deleteFeedCommentMutation, UpdateComments}:
  {Comments:CommentBase[] | undefined; TotalComments:number;
    setPerentID:Dispatch<SetStateAction<CommentBase | undefined>>;
    setCommentId:Dispatch<SetStateAction<CommentBase | undefined>>;
    setComment:Dispatch<SetStateAction<string>>;
    deleteFeedCommentMutation: ({feedid, commentId}:{feedid:string, commentId:string})=>void;
  UpdateComments:()=>void}) => {
  
  const handleMenuItemClick = ({index, comment}:{index: number; comment:CommentBase;}) => {
      // 메뉴 클릭시 동작
      if(index === 1)
      {
        console.log("change click it");
        if(comment)
        {
          setPerentID(undefined);
          setCommentId(comment);
          setComment(comment.contents);
        }
      }
      else
      {
        console.log("delete click it");
        deleteFeedCommentMutation({feedid:comment.feedId.toString(), commentId:comment.commentId.toString()});
        UpdateComments();
      }
  };

  return(
      <>
        <div style={{height:'80%', overflow:'auto'}}>
          <p style={{fontWeight:'600', fontSize:'16px'}}>댓글 ({TotalComments})</p>
          {
            Comments?
            <div>
                  {Comments.map((child, index) => (
                      <div key={index}>
                          <CommentBox data={child} setPerentID={() => {setPerentID(child); setCommentId(undefined); setComment('');}} handleMenuItemClick={handleMenuItemClick}/>
                      </div>
                  ))}
            </div>
            :
            <>
            </>
          }
        </div>
      </>
    )
}

const DetailFeedInfo = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [feedInfo, setFeedInfo] = useState<FeedDetailPost>(new FeedDetailPost(null));
  const [totalComments, setTotalComments] = useState<number>(0);
  const [comments, setComments] = useState<CommentBase[]>();
  const [feedId, setFeedId] = useState<string | null>(null);
  const {getApartCommunityFeedMutation, isPending, isDeletePending} = useGetApartCommunityFeed({feedID:feedId, setPost:setFeedInfo});
  const { getFeedCommentInfoMutation, setFeedCommentMutation , resetFeedCommentMutation, deleteFeedCommentMutation,isCommunityPending } = useGetFeedCommentInfo({feedId:feedId, setFeedComment:setComments, setTotalElements:setTotalComments});
  const [parent, setParentId] = useState<CommentBase>();
  const [changeCommentId, setChangeCommentId] = useState<CommentBase>();
  const [nowCommnet, setNowComment] = useState<string>('');

  const parentRef = useRef<HTMLDivElement | null>(null);
  const [parentSize, setParentSize] = useState({ top : 0, width: 0, height: 0 });
  const [isCommentChanged, setIsCommentChanged] = useState(false);

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (isCommentChanged) {
        setComments([]);
        getFeedCommentInfoMutation();
        setParentId(undefined);
        setChangeCommentId(undefined);
        getApartCommunityFeedMutation();
        setNowComment('');
        setIsCommentChanged(false); // 상태 초기화
        return;
    }

    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }

    localStorage.removeItem("changeFeed");
    setFeedId(localStorage.getItem("selectFeedID"));
    localStorage.setItem("selectMenu", 'community');
    getApartCommunityFeedMutation();
    getFeedCommentInfoMutation();

    const updateSize = () => {
        if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        console.log(rect);
            setParentSize({
                top: window.innerHeight - rect.top - 35, // 버튼 아래
                width: parentRef.current?.offsetWidth,
                height: parentRef.current?.offsetHeight,
            });
        }
    };

      updateSize(); // 초기 크기 설정
      window.addEventListener('resize', updateSize); // 창 크기 변경 시 크기 업데이트

      return () => {
          window.removeEventListener('resize', updateSize); // 클린업
          }
  }, [window.innerHeight, isCommentChanged]);

  const AddComments= () =>{
    handleAddComment();
  }

  const handleAddComment = async () => {
    if(changeCommentId)
      await resetFeedCommentMutation({ feedid: feedId, contents: nowCommnet, commentId: changeCommentId ? changeCommentId.commentId.toString() : null });
    else
      await setFeedCommentMutation({ feedid: feedId, contents: nowCommnet, parentId: parent ? parent.commentId.toString() : null });
      
      // 댓글 추가 완료 후 상태 업데이트
      setIsCommentChanged(true);
  };

  const UpdateComments = () => {
    getFeedCommentInfoMutation();
    setComments([]);
    setParentId(undefined);
    setNowComment('');
    getFeedCommentInfoMutation();
  }

  return (
    <>
      {
        isPending || isCommunityPending || isDeletePending?
        <>
          <div className={[style.register, style.dimmed].join(" ")}>
            <Spinners />
          </div>
        </>
        :
        <></>
      }
      <>
      <div ref={parentRef} style={{ display: 'flex', flexDirection: 'column'}}>
        <FeedHeader title={feedInfo?.title} isMine={feedInfo ? feedInfo.isAuthor : false}
                    feedId={feedId} setFeedInfo={setFeedInfo}/>
        <div style={{marginBottom:'70px'}}>
          <DataBody FeedDetail={feedInfo}/>
          <div className={`${style["login-div-centerline"]}`} />
          <CommentBody Comments={comments} TotalComments={totalComments} 
                        setPerentID={setParentId} setCommentId={setChangeCommentId}
                        setComment={setNowComment}
                        deleteFeedCommentMutation={deleteFeedCommentMutation} 
                        UpdateComments={UpdateComments}/>
        </div>
        
        <div style={{ display:'flex', position:'fixed', flexDirection:'column', top: parentSize.top, zIndex: '9999', width: parentSize.width, backgroundColor:'white'}}>
          <div>
            {
              parent ?
              <div style={{display:'flex', width: parentSize.width, marginBottom:'10px'}}>
                <p style={{backgroundColor:'white', bottom: 120, width: parentSize.width, fontSize:'12px'}}>{parent.commentMemberResponseDto.nickname}님께 댓글쓰는 중...</p>
                <button onClick={() => {setParentId(undefined);}}>X</button>
              </div>
              :
              <></>
            }
          </div>
          <div>
            {
              changeCommentId ?
              <div style={{display:'flex', width: parentSize.width, marginBottom:'10px'}}>
                <p style={{backgroundColor:'white', bottom: 120, width: parentSize.width, fontSize:'12px'}}>{changeCommentId.commentMemberResponseDto.nickname} 댓글 수정 중...</p>
                <button onClick={() => {setChangeCommentId(undefined);}}>X</button>
              </div>
              :
              <></>
            }
          </div>
          <div style={{display:'flex', width: parentSize.width, height: '52px'}}>
            <textarea style={{height:'52px',width:'95%',padding:'10px', borderInline:'none', borderRadius:'6px', border:'1px solid #97BBFF', resize:'none'}} placeholder={`${user.apartmentName}님, 댓글을 작성해보세요!`}
                  value={nowCommnet} onChange={e => setNowComment(e.target.value)}/>
            <button onClick={() => {AddComments();}} style={{margin:'16px 0px 16px 16px '}}>
              <img src={SendMsgIcon} alt="전송"/>
            </button>
          </div>
        </div>
      </div>
      </>
    </>
  );
};

export default DetailFeedInfo;