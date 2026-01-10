import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfoMutation } from "./useUserInfoMutation";

export const useLogout = () => {
  const { getUserInfo } = useUserInfoMutation();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/logout");
      return res.data;
    },
    onSuccess: async () => {
      // 로그인 상태 플래그 제거
      localStorage.removeItem("isLoggedIn");
      // refresh user info after logout
      getUserInfo.mutate();
      // 메인 페이지로 리다이렉트
      navigate("/", { replace: true });
    },
  });

  return { logoutMutation };
};
