import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useModalTextStore } from "../stores/useModalText";
import { useCertifyInfo } from "../stores/useCertifyInfo";

export const useCheckEmail = () => {
  const { setIsNest } = useCertifyInfo();
  const { setModalText, setIsOnlyConfirmed } = useModalTextStore();

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
      setIsOnlyConfirmed(false);
      setIsNest(true);
    },
    onError: () => {
      setModalText("중복된 이메일입니다.");
    },
  });

  return {
    checkEmailMutation,
    checkEmailPending: checkEmailMutation.isPending,
  };
};
