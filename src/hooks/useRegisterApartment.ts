import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

export const useRegisterApartment = () => {
  const navigate = useNavigate();
  const { refreshUserInfo } = useUserInfo();

  const registerMutation = useMutation({
    mutationFn: async (apartmentId: number) => {
      const res = await axios.post(`/api${API_ENDPOINTS.USER.ADD_APART}`, {
        apartmentId: apartmentId,
      });
      return res.data;
    },
    onSuccess: () => {
      // 사용자 정보 새로고침
      refreshUserInfo();
      // 마이페이지로 이동
      navigate("/my-page");
    },
    onError: (error: any) => {
      console.error("단지 등록 실패:", error);
    },
  });

  return {
    registerApartment: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    isError: registerMutation.isError,
    error: registerMutation.error,
  };
};
