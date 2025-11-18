import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useModalTextStore } from "../stores/useModalText";
import { usePendingStore } from "../stores/usePendingStore";

export const useFindId = () => {
  const { setModalText, setModalTitle } = useModalTextStore();
  const { setModalPending } = usePendingStore();

  const findIdMutation = useMutation({
    mutationFn: async ({
      name,
      phoneNumber,
    }: {
      name: string;
      phoneNumber: string;
    }) => {
      const res = await axios.post(`/api/member/find-id`, {
        name,
        phoneNumber:
          phoneNumber.slice(0, 3) +
          "-" +
          phoneNumber.slice(3, 7) +
          "-" +
          phoneNumber.slice(7, 11),
      });
      return res.data;
    },
    onError: () => {
      setModalTitle("안내");
      setModalText("찾을 수 없는 사용자입니다.");
      setModalPending(true);
    },
    onSuccess: () => {
      console.log("성공!");
    },
  });

  return { findIdMutation, findIdPending: findIdMutation.isPending };
};
