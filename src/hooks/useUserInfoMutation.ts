import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface UserInfoResponse {
  token: string;
}

export const useUserInfoMutation = () => {
  const user = useUserInfo();

  const mutation = useMutation<UserInfoResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.get(`/api${API_ENDPOINTS.USER.MEMBER}`);
        //console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error("");
      }
    },
    onSuccess: (data) => {
      try{
        user.apartmentID = data.data.apartmentId;
        user.apartmentName = data.data.apartmentName;
        user.building = data.data.building;
        user.email = data.data.email;
        user.fileID = data.data.fileId;
        user.location = data.data.location;
        user.memberApartmentID = data.data.memberApartmentId;
        user.moveInDate = data.data.moveInDate;
        user.name = data.data.name;
        user.nickname = data.data.nickname;
        user.phoneNumber = data.data.phoneNumber;
        user.region = data.data.region;
        user.uint = data.data.uint;
        user.setIsLogin(true);
      }catch(err)
      {
        console.log(err);
        user.setIsLogin(false);
        throw new Error("JSON PASSER ERROR");
      }
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
