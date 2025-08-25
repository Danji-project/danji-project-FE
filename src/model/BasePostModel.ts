interface IPostBase
{
    feedId:number;
    memberId:number;
    nickName:string;
    title:string;
    contents:string;
    localDateTime:string;
    viewCount:number;
    reactionCount:number;
    commentCount:number;
    bookmarkCount:number;
    thumbnailFileUrl:string[];
    isReacted:boolean;
}

export class BasePost implements IPostBase
{
    feedId:number;
    memberId:number;
    nickName:string;
    title:string;
    contents:string;
    localDateTime:string;
    viewCount:number;
    reactionCount:number;
    commentCount:number;
    bookmarkCount:number;
    thumbnailFileUrl:string[];
    isReacted:boolean;

    constructor(element:IPostBase)
    {
        this.feedId = element.feedId;
        this.memberId = element.memberId;
        this.nickName = element.nickName;
        this.title = element.title;
        this.contents = element.contents;
        this.localDateTime = element.localDateTime;
        this.viewCount = element.viewCount;
        this.reactionCount = element.reactionCount;
        this.commentCount = element.commentCount;
        this.bookmarkCount = element.bookmarkCount;
        this.thumbnailFileUrl = element.thumbnailFileUrl;
        this.isReacted = element.isReacted;
    }
}