import { BasePost } from "../../model/BasePostModel";
import styles from './PostSummary.module.scss';

import EyesIcon from '../../assets/Icon/eyesIcon.png'
import HeartIcon from '../../assets/Icon/heartIcon.png'
import BookMarkIcon from '../../assets/Icon/bookmarkIcon.png'
import CommentIcon from '../../assets/Icon/commentIcon.png'

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
    <div onClick={()=>{onClick(element.feedId)}} className={`${styles.divBorder}`}>
      <div className={`${styles.Container}`}>
        <div style={{height:'44px'}}>
          <p className={`${styles.titleP}`}>{element.title}</p>
          <p className={`${styles.contentP}`}>{element.contents}</p>
        </div>
        <img  src={element.thumbnailFileUrl ?`https://s3.ap-northeast-2.amazonaws.com/danjitalk/${element.thumbnailFileUrl[0]}`: undefined}/>
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
  );
};

export default PostSummary;