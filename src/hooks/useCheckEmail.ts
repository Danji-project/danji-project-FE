import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useModalTextStore } from "../stores/useModalText";

export const useCheckEmail = () => {
  const { setModalText } = useModalTextStore();

  const checkEmailMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await axios.post(`/api/member/check-email-duplication`, {
        email,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (!data) {
        setModalText("사용 가능한 이메일입니다.");
      } else {
        setModalText(data.message);
      }
    },
  });

  return {
    checkEmailMutation,
    checkEmailPending: checkEmailMutation.isPending,
  };
};
