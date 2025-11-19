import axios from "axios"
import { useUserInfo } from "../stores/userStore"
import { useMutation } from "@tanstack/react-query";

export const useUserInfoMutation = () => {
  const { updateUserInfo, setIsLogin } = useUserInfo();

  const getUserInfo = useMutation({
    mutationFn: async () => {
      const res = await axios.get("/api/member");
      console.log(res);
      return res.data;
    },
    onSuccess: (data) => {
      setIsLogin(true);
      updateUserInfo(data.data.email, data.data.password, data.data.nickname, !data.data.fileId ? "./profile_imgSrc.jpg" : data.data.fileId, data.data.phone);
    }
  })

  return {getUserInfo, getUserData: getUserInfo.data, userInfoPending: getUserInfo.isPending}
}
