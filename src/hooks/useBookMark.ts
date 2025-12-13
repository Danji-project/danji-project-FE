import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useBookMark = () => {

  const apartBookMarkMutation = useMutation({
    mutationFn: async (apartmentId: number) => {
      const response = await axios.post(
        `/api/bookmarks/apartments/${apartmentId}`
      );
      return response.data;
    },
    onSuccess: () => {
        console.log('apart bookmark sussess');
    },
    onError: (data) => {
        console.log(data);
    },
  });

  const ApartBookMarkMutate = (apartmentId: number) => {
    apartBookMarkMutation.mutate(apartmentId);
  };

  const feedBookMarkMutation = useMutation({
    mutationFn: async (feedId: number) => {
      const response = await axios.post(
        `/api/bookmarks/feeds/${feedId}`
      );
      return response.data;
    },
    onSuccess: () => {
        console.log('feed bookmark sussess');
    },
    onError: (data) => {
        console.log(data);
    },
  });

  const FeedBookMarkMutate = (feedId: number) => {
    feedBookMarkMutation.mutate(feedId);
  };

  const feedBookMarkDeleteMutation = useMutation({
    mutationFn: async (feedId: number) => {
      const response = await axios.delete(
        `/api/bookmarks/feeds/${feedId}`
      );
      return response.data;
    },
    onSuccess: () => {
        console.log('feed bookmark sussess');
    },
    onError: (data) => {
        console.log(data);
    },
  });

  const FeedBookMarkDeleteMutate = (feedId: number) => {
    feedBookMarkDeleteMutation.mutate(feedId);
  };

  return {
    ApartBookMarkMutate,
    FeedBookMarkMutate,
    FeedBookMarkDeleteMutate
  };
};
