import { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../layouts/Header";
import { useFeedDetail } from "../../hooks/useFeedDetail";
import CommunityDetailContents from "../../components/community-detail/CommunityDetailContents";

const CommunityDetail = () => {
  const { feedId } = useParams();

  const { feedDetailMutate, feedDetail, feedDetailPending } = useFeedDetail(
    feedId!
  );

  useEffect(() => {
    feedDetailMutate();
  }, []);

  return (
    <>
      <Header title={feedDetail?.data.title!} hasBackButton />
      <CommunityDetailContents
        contentData={!feedDetailPending ? feedDetail : null}
      />
    </>
  );
};

export default CommunityDetail;
