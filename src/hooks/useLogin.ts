import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "../stores/userStore";
import { useModalTextStore } from "../stores/useModalText";
import { usePendingStore } from "../stores/usePendingStore";
import type { Dispatch, SetStateAction } from "react";

export const useLogin = (
  loginId: string,
  loginPassword: string,
  setIdError: Dispatch<SetStateAction<string>>
) => {
  const navigate = useNavigate();
  const { setIsLogin } = useUserInfoStore();
  const { setModalTitle, setModalText } = useModalTextStore();
  const { setLoginPending, setModalPending } = usePendingStore();

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
      // 로그인 로딩중인 여부 변수
      const isLoginPending = loginMutation.isPending;
      setLoginPending(isLoginPending);

      return res.data;
    },
    onSuccess: () => {
      // 로그인 상태 플래그 저장하기
      localStorage.setItem("isLoggedIn", "true");
      // store에도 저장
      setIsLogin(true);
      // 홈으로 리다이렉트
      navigate("/");
    },
    onError: () => {
      setModalPending(true);
      setModalTitle("오류 발생");
      setModalText("아이디 혹은 비밀번호가 올바르지 않습니다.");
      setIdError("아이디 혹은 비밀번호가 올바르지 않습니다.");
    },
  });

  return { loginMutation, loginMutationPending: loginMutation.isPending };
};
