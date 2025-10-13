export interface ICommentMemberResponse{
    memberId: number;
    nickname: string;
    fileId: number;
}

interface ICommentBase
{
    commentId: number;
    feedId: number;
    contents: string;
    createdAt: string;

    commentMemberResponseDto: ICommentMemberResponse;

    childrenCommentDto: ICommentBase[];
    isAuthor: boolean;
}

export class CommentBase implements ICommentBase
{
    commentId: number;
    feedId: number;
    contents: string;
    createdAt: string;

    commentMemberResponseDto: ICommentMemberResponse;

    childrenCommentDto: ICommentBase[];
    isAuthor: boolean;

    constructor(element:ICommentBase | null){
        if(element)
        {
            this.commentId = element.commentId;
            this.feedId = element.feedId;
            this.contents = element.contents;
            this.createdAt = element.createdAt;
            this.commentMemberResponseDto = element.commentMemberResponseDto;
            this.childrenCommentDto = element.childrenCommentDto;
            this.isAuthor = element.isAuthor;
        }
        else
        {
            this.commentId = 0;
            this.feedId =  0;
            this.contents = '';
            this.createdAt = '';
            this.commentMemberResponseDto = {memberId:0, nickname:'', fileId:0};
            this.childrenCommentDto = [];
            this.isAuthor = false;
        }
    }
}