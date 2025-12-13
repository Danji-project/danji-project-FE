export interface BasePost {
  feedId: number;
  title: string;
  contents: string;
  thumbnailFileUrl: string | null;
  nickName: string | null;
  localDateTime: string;
  viewCount: number;
  reactionCount: number;
  bookmarkCount: number;
  commentCount: number;
}
