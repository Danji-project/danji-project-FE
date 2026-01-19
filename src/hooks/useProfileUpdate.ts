import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserInfoStore } from "../stores/userStore";

interface RequestDTO {
  name: string;
  nickname: string;
  phoneNumber: string;
  password?: string;
  file?: File | null;
}

export const useProfileUpdate = () => {
  const { refreshUserInfo } = useUserInfoStore();

  const updateProfileOnly = useMutation<void, Error, RequestDTO>({
    mutationFn: async ({ name, nickname, phoneNumber, password, file }: RequestDTO) => {
      const formData = new FormData();
      formData.append(
        "requestDto",
        new Blob([JSON.stringify({ name, nickname, phoneNumber, password })], {
          type: "application/json",
        })
      );
      if (file) {
        formData.append("multipartFile", file);
      }

      await axios.put("/api/member", formData);
    },
    onSuccess: async () => {
      const response = await axios.get("/api/member", {
        withCredentials: true,
      });
      if (response.data) {
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      }
      refreshUserInfo();
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  return {
    updateProfileOnly,
    updateProfilePending: updateProfileOnly.isPending,
  };
};
