import { BasePost } from "../../model/BasePostModel";
import styles from './PostSummary.module.scss';

import EyesIcon from '../../assets/Icon/eyesIcon.svg'
import HeartIcon from '../../assets/Icon/heartIcon.svg'
import BookMarkIcon from '../../assets/Icon/bookmarkIcon.svg'
import CommentIcon from '../../assets/Icon/commentIcon.svg'

interface PostProps{
  element : BasePost;
  onClick: (id:number) => void;
}

const PostSummary: React.FC<PostProps> = ({ element, onClick }) => {
  const date = new Date(element.localDateTime);
  // 날짜 형식을 'YY.MM.DD'로 변환
  const formattedDate = date.toLocaleDateString('ko-KR', {
      year: '2-digit', // 2자리 연도
      month: '2-digit', // 2자리 월
      day: '2-digit' // 2자리 일
  }).replace(/\./g, '.').substring(0,10); // 구분자를 '.'으로 변경

  return (
    <div className={`${styles.divBorder}`}>
      <div onClick={()=>{onClick(element.feedId)}}>
        <div className={`${styles.Container}`}>
          <div style={{height:'52px', overflow:'hidden'}}>
            <p className={`${styles.titleP}`}>{element.title}</p>
            <p className={`${styles.contentP}`}>{element.contents}</p>
          </div>
          {
            element.thumbnailFileUrl ?
            <img style={{width:'62px', height:'62px', borderRadius:'4px', border:'none'}} src={element.thumbnailFileUrl ?`${element.thumbnailFileUrl}`: undefined}/>
            :
            <></>
          }
        </div>

        <div className={`${styles.Container}`}>
          <div className={`${styles.leftContainer}`}>
            <p>작성자</p>
            <p style={{margin:'0px 4px'}}>{element.nickName ? element.nickName : '익명'}</p>
            <p>{formattedDate}</p>
          </div>
          <div className={`${styles.rightContainer}`}>
            <img src={EyesIcon}/>
            <p>{element.viewCount}</p>
            <img src={HeartIcon}/>
            <p>{element.reactionCount}</p>
            <img src={BookMarkIcon}/>
            <p>{element.bookmarkCount}</p>
            <img src={CommentIcon}/>
            <p>{element.commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSummary;