import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";

export const useRegister = () => {
  const navigate = useNavigate();
  const { setModalPending } = usePendingStore();
  const { setModalText, setIsOnlyConfirmed } = useModalTextStore();

  const registerMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      name,
      nickname,
      phoneNumber,
    }: {
      email: string;
      password: string;
      name: string;
      nickname: string;
      phoneNumber: string;
    }) => {
      const res = await axios.post("/api/member/signup", {
        email,
        password,
        name,
        nickname,
        phoneNumber,
      });

      return res.data;
    },
    onSuccess: () => {
      navigate("/register-success");
    },
    onError: (error: unknown) => {
      let errorMessage = "회원가입 중 오류가 발생했습니다.";

      if (axios.isAxiosError(error)) {
        // 서버 응답 데이터에서 메시지 추출
        const responseData = error.response?.data;
        if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (error.response?.statusText) {
          errorMessage = error.response.statusText;
        }
      }

      // 모달로 에러 메시지 표시
      setModalText(errorMessage);
      setIsOnlyConfirmed(true);
      setModalPending(true);
    },
  });

  return {
    registerMutation,
    registerPending:
      (registerMutation as any).isPending ??
      (registerMutation as any).isLoading ??
      false,
  };
};
