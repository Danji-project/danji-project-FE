import { useParams } from "react-router";
import Header from "../../layouts/Header";
import { useFeedDetail } from "../../hooks/useFeedDetail";
import CommunityDetailContents from "../../components/community-detail/CommunityDetailContents";
import CommunityDetailSkeleton from "../../components/common/community-detail-skeleton/CommunityDetailSkeleton";

const CommunityDetail = () => {
  const { feedId } = useParams();

  const { feedDetail, feedDetailPending } = useFeedDetail(feedId!);

  if (feedDetailPending || !feedDetail) {
    return (
      <>
        <Header title="" hasBackButton />
        <CommunityDetailSkeleton />
      </>
    );
  }

  return (
    <>
      <Header title={feedDetail.data.title} hasBackButton />
      <CommunityDetailContents contentData={feedDetail} />
    </>
  );
};

export default CommunityDetail;
