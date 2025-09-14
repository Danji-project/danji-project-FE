interface IUrl
{
    fullUrl : string;
    url : string;
}

class urlData
{
    fullUrl : string;
    url : string;

    constructor(element:IUrl | null){
        this.fullUrl = element? element.fullUrl : '';
        this.url = element? element.url : '';
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

    constructor(element:IFeedDetailPostBase|null)
    {
        if(element)
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
        else{
            this.feedId = 0;
            this.title = '';
            this.contents = '';
            this.createdAt = '';
            this.feedMemberResponseDto = {memberId:0, nickname:''};
            this.s3ObjectResponseDtoList = [];
            this.viewCount = 0;
            this.reactionCount = 0;
            this.commentCount = 0;
            this.bookmarkCount = 0;
            this.isReacted = false;
            this.isBookmarked = false;
            this.isAuthor = false;
        }
    }
}