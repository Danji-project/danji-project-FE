export interface BasePost {
  feedId: number;
  memberId?: number;
  nickName?: string | null;
  title: string;
  contents: string;
  localDateTime: string;
  viewCount?: number;
  commentCount?: number;
  bookmarkCount?: number;
  thumbnailFileUrl?: string | null;
  reactionCount?: number;
  [key: string]: any;
}
