import { useParams } from "react-router";
import Header from "../../layouts/Header";
import { useFeedRegisterStore } from "../../stores/useFeedRegisterStore";
import CommunityWriteContents from "./CommunityWriteContents";
import type { FormEvent } from "react";
import { useFeedRegister } from "../../hooks/useFeedRegister";

export default function CommunityWrite() {
  const { id } = useParams<{ id: string }>();
  const { title, content, file, mode, feedId } = useFeedRegisterStore();
  const {
    postFeedRegister,
    postFeedUpdate,
    postFeedUpdatePending,
    postFeedPending,
  } = useFeedRegister(Number(id));

  const onFeedSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestDto = {
      title,
      contents: content,
      feedType: "FEED",
      apartmentId: Number(id),
    };

    const formData = new FormData();
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(requestDto)], { type: "application/json" }),
    );

    if (file) {
      Array.from(file).forEach((f) => {
        formData.append("multipartList", f);
      });
    }

    if (mode === "REGISTER") {
      postFeedRegister.mutate({ formData });
    }
    if (mode === "EDIT") {
      postFeedUpdate.mutate({ formData, feedId: feedId! });
    }
  };

  return (
    <form onSubmit={onFeedSubmit}>
      <Header
        title={mode === "REGISTER" ? "글쓰기" : "수정하기"}
        hasBackButton
        buttonText={
          postFeedPending || postFeedUpdatePending
            ? "등록 중"
            : mode === "REGISTER"
              ? "등록"
              : "수정"
        }
        buttonDisabled={!title || !content || postFeedPending}
      />
      <CommunityWriteContents />
    </form>
  );
}
