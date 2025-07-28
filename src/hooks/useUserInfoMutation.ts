import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface UserInfoResponse {
  code: number;
  data: {
    apartmentId: null;
    apartmentName: null | string;
    building: null;
    carNumber: null | number;
    email: string;
    fileId: null;
    location: string | null;
    memberApartmentId: number | null;
    moveInDate: null | string;
    name: string;
    nickname: string;
    numberOfResidents: number | null;
    phoneNumber: string;
    region: string | null;
    unit: null;
  };
}

export const useUserInfoMutation = () => {
  const user = useUserInfo();

  const mutation = useMutation<UserInfoResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.get(`/api${API_ENDPOINTS.USER.MEMBER}`);
        return response.data;
      } catch (error) {
        throw new Error("");
      }
    },
    onSuccess: (data) => {
      user.setIsLogin(true);
      user.setEmail(data.data.email);
      user.setNickname(data.data.nickname);
    },
    onError: (err: Error) => {
      user.setIsLogin(false);
    },
  });

  const executeUserInfoMutation = () => {
    mutation.mutate();
  };

  return {
    executeUserInfoMutation,
    isPending: mutation.isPending,
  };
};
