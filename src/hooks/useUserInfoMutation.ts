import axios from "axios";
import { useUserInfo } from "../stores/userStore";
import { useMutation } from "@tanstack/react-query";

export const useUserInfoMutation = () => {
  const { updateUserInfo, updateAllUserInfo, setIsLogin } = useUserInfo();

  const getUserInfo = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.get("/api/member", {
          validateStatus: (status) => {
            // 401 에러도 정상 응답으로 처리
            return status === 200 || status === 401;
          },
        });

        // 401 에러인 경우 정상적으로 반환
        if (res.status === 401) {
          return { data: null, status: 401 };
        }

        return res.data;
      } catch (error: unknown) {
        // 네트워크 에러 등 예기치 않은 에러만 throw
        console.error("사용자 정보 조회 중 에러:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (!data?.data) {
        setIsLogin(false);
        return;
      } else setIsLogin(true);

      try {
        updateAllUserInfo(
          data.data.email,
          data.data.password,
          data.data.nickname,
          !data.data.fileId ? "./profile_imgSrc.jpg" : data.data.fileId,
          data.data.phone,
          data.data.name,
          data.data.memberApartmentId,
          data.data.apartmentId,
          data.data.apartmentName,
          data.data.region,
          data.data.location,
          data.data.building,
          data.data.unit,
          data.data.moveInDate,
          data.data.numberOfResidents,
          data.data.carNumbers
        );
      } catch (exception) {
        console.log(exception);
        updateUserInfo(
          data.data.email,
          data.data.password,
          data.data.nickname,
          !data.data.fileId ? "./profile_imgSrc.jpg" : data.data.fileId,
          data.data.phone,
          data.data.name || ""
        );
      }

      setIsLogin(true);
      updateUserInfo(
        data.data.email,
        data.data.password,
        data.data.nickname,
        data.data.fileId || "/profile_imgSrc.jpg",
        data.data.phone,
        data.data.name || ""
      );
    },
    onError: (error: unknown) => {
      console.error("사용자 정보 조회 실패:", error);
    },
  });

  return {
    getUserInfo,
    getUserData: getUserInfo.data,
    userInfoPending: getUserInfo.isPending,
  };
};
