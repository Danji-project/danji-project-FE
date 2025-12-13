import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfoMutation } from "./useUserInfoMutation";
import { usePendingStore } from "../stores/usePendingStore";

export const useLogin = (
  loginId: string,
  loginPassword: string,
  setIdError: Dispatch<SetStateAction<string>>
) => {
  const navigate = useNavigate();
  const { getUserInfo } = useUserInfoMutation();
  const { setLoginPending } = usePendingStore();

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
      setLoginPending(false);
      // 사용자 정보 조회를 기다린 후 네비게이트
      getUserInfo.mutate(undefined, {
        onSettled: () => {
          navigate("/");
        },
      });
    },
    onError: (e: Error) => {
      setLoginPending(false);
      setIdError("이메일 형식이 올바르지 않습니다.|예: example@domain.com");
      console.error(e);
    },
  });

  return { loginMutation, loginMutationPending: loginMutation.isPending };
};
