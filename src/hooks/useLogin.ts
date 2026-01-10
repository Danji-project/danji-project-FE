import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfoMutation } from "./useUserInfoMutation";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";

export const useLogin = (
  loginId: string,
  loginPassword: string,
  setIdError: Dispatch<SetStateAction<string>>
) => {
  const navigate = useNavigate();
  const { getUserInfo } = useUserInfoMutation();
  const { setLoginPending, setModalPending } = usePendingStore();
  const { setModalText, setIsOnlyConfirmed } = useModalTextStore();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        "/api/login",
        {
          loginId,
          password: loginPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 자동 전송
        }
      );
      return res.data;
    },
    onSuccess: () => {
      // 쿠키 기반 인증이므로 토큰 저장 불필요 (서버에서 쿠키 설정)
      // 로그인 상태 플래그 저장 (앱 시작 시 API 호출 여부 판단용)
      localStorage.setItem("isLoggedIn", "true");
      setLoginPending(false);
      // 사용자 정보 조회를 기다린 후 네비게이트
      getUserInfo.mutate(undefined, {
        onSettled: () => {
          navigate("/");
        },
      });
    },
    onError: (error: unknown) => {
      setLoginPending(false);
      setIdError("");

      let errorMessage = "로그인 중 오류가 발생했습니다.";

      if (axios.isAxiosError(error)) {
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

  return { loginMutation, loginMutationPending: loginMutation.isPending };
};
