import axios from "axios";
import { useUserInfo } from "../stores/userStore";
import { useMutation } from "@tanstack/react-query";

export const useUserInfoMutation = () => {
  const { updateUserInfo, setIsLogin } = useUserInfo();

  const getUserInfo = useMutation({
    mutationFn: async () => {
      // 토큰이 없으면 호출하지 않음
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setIsLogin(false);
        return { data: null };
      }

      try {
        const res = await axios.get("/api/member", {
          validateStatus: (status) => {
            // 401 에러는 정상적인 응답으로 처리하여 에러 출력 방지
            return status === 200 || status === 401;
          },
        });
        console.log(res);
        // 401 에러인 경우 조용히 처리
        if (res.status === 401) {
          setIsLogin(false);
          localStorage.removeItem("auth_token");
          return { data: null };
        }
        return res.data;
      } catch (error: any) {
        // 401 에러는 조용히 처리
        if (error?.response?.status === 401) {
          setIsLogin(false);
          localStorage.removeItem("auth_token");
          return { data: null };
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      // 401 에러인 경우 data가 null이므로 로그인 상태만 업데이트
      if (!data || !data.data) {
        setIsLogin(false);
        return;
      }
      setIsLogin(true);
      updateUserInfo(
        data.data.email,
        data.data.password,
        data.data.nickname,
        !data.data.fileId ? "./profile_imgSrc.jpg" : data.data.fileId,
        data.data.phone
      );
    },
    onError: (error: any) => {
      // 401 에러는 이미 mutationFn에서 처리했으므로 여기서는 다른 에러만 처리
      if (error?.response?.status !== 401) {
        console.error("사용자 정보 조회 실패:", error);
      }
    },
  });

  return {
    getUserInfo,
    getUserData: getUserInfo.data,
    userInfoPending: getUserInfo.isPending,
  };
};
