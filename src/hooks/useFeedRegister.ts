import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useFeedRegister = (
  title: string,
  contents: string,
  apartmentId: number
) => {
  const formData = new FormData();

  formData.append(
    "requestDto",
    new Blob(
      [
        JSON.stringify({
          title: title,
          contents: contents,
          feedType: "FEED",
          apartmentId: apartmentId,
        }),
      ],
      { type: "application/json" }
    )
  );

  const feedRegisterMutate = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/community/feeds`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const feedRegister = () => {
    feedRegisterMutate.mutate();
  };

  return {
    feedRegister,
    feedRegisterPending: feedRegisterMutate.isPending,
  };
};
