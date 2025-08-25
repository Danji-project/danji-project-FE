import { BasePost } from "../../model/BasePostModel";

interface PostProps{
  element : BasePost;
  onClick: (id:number) => void;
}

const PostSummary: React.FC<PostProps> = ({ element, onClick }) => {
  return (
    <div onClick={()=>{onClick(element.feedId)}}>
        <p>{element.title}</p>
        <p>{element.contents}</p>

        <p>작성자</p>
        <p>{element.nickName}</p>
        <p>{element.localDateTime}</p>

        <p>{element.viewCount}</p>
        <p>{element.reactionCount}</p>
        <p>{element.bookmarkCount}</p>
        <p>{element.commentCount}</p>
    </div>
  );
};

export default PostSummary;