import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "../stores/userStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsLogin } = useUserInfoStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/logout");
      return res.data;
    },
    onSuccess: async () => {
      // 로그인 상태 플래그 제거
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");

      // Zustand 상태 초기화
      setIsLogin(false);
      useUserInfoStore.setState({ data: null });

      // 유저 정보 쿼리 무효화 (캐시 삭제)
      await queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });

      // 메인 페이지로 리다이렉트
      navigate("/", { replace: true });
    },
  });

  return { logoutMutation };
};
