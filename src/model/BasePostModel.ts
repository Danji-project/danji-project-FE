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

interface IUrl
{
    fullUrl : string;
    url : string;
}

class urlData
{
    fullUrl : string;
    url : string;

    constructor(element:IUrl){
        this.fullUrl = element.fullUrl;
        this.url = element.url;
    }
}

interface IFeedDetailPostBase
{
    feedId:number;
    title:string;
    contents:string;
    createdAt:string;

    feedMemberResponseDto:{
        memberId : number;
        nickname : string;
    };

    s3ObjectResponseDtoList:urlData[];

    viewCount:number;
    reactionCount:number;
    commentCount:number;
    bookmarkCount:number;
    isReacted:boolean;
    isBookmarked : boolean;
    isAuthor : boolean;
}

export class FeedDetailPost implements IFeedDetailPostBase
{
    feedId:number;
    title:string;
    contents:string;
    createdAt:string;

    feedMemberResponseDto:{
        memberId : number;
        nickname : string;
    };

    s3ObjectResponseDtoList:urlData[];

    viewCount:number;
    reactionCount:number;
    commentCount:number;
    bookmarkCount:number;
    isReacted:boolean;
    isBookmarked : boolean;
    isAuthor : boolean;

    constructor(element:IFeedDetailPostBase)
    {
        this.feedId = element.feedId;
        this.title = element.title;
        this.contents = element.contents;
        this.createdAt = element.createdAt;
        this.feedMemberResponseDto = element.feedMemberResponseDto;
        this.s3ObjectResponseDtoList = element.s3ObjectResponseDtoList;
        this.viewCount = element.viewCount;
        this.reactionCount = element.reactionCount;
        this.commentCount = element.commentCount;
        this.bookmarkCount = element.bookmarkCount;
        this.isReacted = element.isReacted;
        this.isBookmarked = element.isBookmarked;
        this.isAuthor = element.isAuthor;
    }
}