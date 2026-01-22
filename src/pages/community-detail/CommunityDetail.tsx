import { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../layouts/Header";
import { useFeedDetail } from "../../hooks/useFeedDetail";
import { useFeedDetailStore } from "../../stores/useFeedDetailStore";
import CommunityDetailContents from "./CommunityDetailContents";
import { useComment } from "../../hooks/useComment";

const CommunityDetail = () => {
  const { id, feedId } = useParams<{ id: string; feedId: string }>();

  const { fetchFeedDetail, fetchViewUp } = useFeedDetail(Number(feedId));
  const { data: feedDetailData } = useFeedDetailStore();

  useEffect(() => {
    fetchFeedDetail();
  }, [feedId, id, fetchFeedDetail]);

  useEffect(() => {
    fetchViewUp();
  }, [fetchViewUp]);

  const isLoaded = Boolean(feedDetailData?.feedId);

  return (
    <>
      <Header title={isLoaded ? feedDetailData.title : ""} hasBackButton />
      {isLoaded && (
        <CommunityDetailContents
          feedDetailData={feedDetailData}
          id={id!}
          feedId={feedId!}
        />
      )}
    </>
  );
};

export default CommunityDetail;
