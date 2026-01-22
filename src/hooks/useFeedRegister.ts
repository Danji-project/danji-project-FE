import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { useFeedRegisterStore } from "../stores/useFeedRegisterStore";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";

export const useFeedRegister = (apartmentId: number) => {
  const navigate = useNavigate();
  const { setTitle, setContent, setFile, setPreviewUrls } =
    useFeedRegisterStore();
  const { setModalPending } = usePendingStore();
  const { setModalText, setModalTitle } = useModalTextStore();

  const postFeedRegister = useMutation<void, Error, { formData: FormData }>({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      await axios.post("/api/community/feeds", formData);
    },
    onSuccess: () => {
      navigate(`/apart-info/${apartmentId}`);
      setTitle("");
      setContent("");
      setFile(null);
      setPreviewUrls([]);
    },
  });

  const postFeedUpdate = useMutation<
    void,
    Error,
    { formData: FormData; feedId: number }
  >({
    mutationFn: async ({
      formData,
      feedId,
    }: {
      formData: FormData;
      feedId: number;
    }) => {
      await axios.put(`/api/community/feeds/${feedId}`, formData);
    },
    onSuccess: () => {
      navigate(`/apart-info/${apartmentId}`);
      setTitle("");
      setContent("");
      setFile(null);
      setPreviewUrls([]);
    },
  });

  const postFeedDelete = useMutation<void, Error, { feedId: number }>({
    mutationFn: async ({ feedId }: { feedId: number }) => {
      await axios.delete(`/api/community/feeds/${feedId}`);
    },
    onSuccess: () => {
      setModalPending(true);
      setModalTitle("확인");
      setModalText("올바르게 삭제되었습니다.");
    },
  });

  return {
    postFeedRegister,
    postFeedUpdate,
    postFeedDelete,
    postFeedUpdatePending: postFeedUpdate.isPending,
    postFeedPending: postFeedRegister.isPending,
  };
};
