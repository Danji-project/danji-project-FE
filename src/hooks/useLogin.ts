import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface LoginResponse {
  token: string;
}

const errorMessages: { [key: number]: string } & {
  default: string;
  networkError: string;
} = {
  400: "아이디 또는 비밀번호가 일치하지 않습니다",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요",
  networkError: "인터넷 연결을 확인해주세요",
  default: "로그인 중 오류가 발생했습니다",
};

export const useLogin = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation<LoginResponse, Error>({
    mutationFn: async () => {
      user.isUserPandding = true;
      try {
        const requestData = { loginId: user.email, password: user.password };
        console.log("로그인 요청:", {
          url: `/api${API_ENDPOINTS.AUTH.LOGIN}`,
          data: requestData,
        });

        const response = await axios.post(
          `/api${API_ENDPOINTS.AUTH.LOGIN}`,
          requestData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("로그인 성공:", response.data);
        return response.data;
      } catch (error) {
        console.error("로그인 실패:", error);

        if (axios.isAxiosError(error)) {
          console.error("에러 상세:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url,
          });

          const status = error.response?.status;
          if (status && errorMessages[status]) {
            throw new Error(errorMessages[status]);
          } else if (error.request) {
            throw new Error(errorMessages.networkError);
          }
        }
        throw new Error(errorMessages.default);
      }
    },
    onSuccess: async (data) => {
      user.isUserPandding = false;
      if (data?.token) {
        localStorage.setItem("user_token", data.token);
      }

      // 로그인 성공 후 사용자 정보 가져오기
      try {
        console.log("로그인 성공 - 사용자 정보 조회 시작");
        const userInfoResponse = await axios.get(
          `/api${API_ENDPOINTS.USER.MEMBER}`,
          {
            withCredentials: true,
          }
        );

        console.log("사용자 정보 조회 성공:", userInfoResponse.data);

        // 프로필 이미지 URL 결정
        let profileImageUrl = "/profile_imgSrc.jpg";
        if (userInfoResponse.data.data?.profileImageUrl) {
          profileImageUrl = userInfoResponse.data.data.profileImageUrl;
        } else if (userInfoResponse.data.data?.fileId) {
          profileImageUrl = `https://s3.ap-northeast-2.amazonaws.com/danjitalk/${userInfoResponse.data.data.fileId}`;
        }

        // 사용자 정보 일괄 업데이트
        const userData = userInfoResponse.data.data;
        user.updateUserInfo({
          // 기본 정보
          email: userData.email,
          name: userData.name,
          nickname: userData.nickname,
          phoneNumber: userData.phoneNumber,

          // 아파트 정보
          apartmentId: userData.apartmentId,
          apartmentName: userData.apartmentName,
          building: userData.building,
          carNumber: userData.carNumber,
          fileId: userData.fileId,
          location: userData.location,
          memberApartmentId: userData.memberApartmentId,
          moveInDate: userData.moveInDate,
          numberOfResidents: userData.numberOfResidents,
          region: userData.region,
          unit: userData.unit,

          // 프로필 이미지
          profileImage: profileImageUrl,
        });

        console.log("로그인 후 사용자 정보 업데이트 완료:", {
          name: userData.name,
          nickname: userData.nickname,
          phoneNumber: userData.phoneNumber,
        });
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        // 사용자 정보 조회가 실패해도 로그인은 성공한 것으로 처리
      }

      user.setIsLogin(true);
      navigate("/", { replace: true });
    },
    onError: (err: Error) => {
      user.isUserPandding = false;
      user.setError(err.message);
      user.setIsLogin(false);
    },
  });

  const Login: Function = () => {
    mutation.mutate();
  };

  return {
    Login,
    isLogining: mutation.isPending,
  };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation<LoginResponse, Error>({
    mutationFn: async () => {
      try {
        // console.log(user.email);
        // console.log(user.password);

        const response = await axios.post(`/api${API_ENDPOINTS.AUTH.LOGOUT}`);
        return response.data;
      } catch (error) {
        throw new Error(errorMessages.default);
      }
    },
    onSuccess: (data) => {
      user.setIsLogin(false);
      navigate("/", { replace: true });
    },
    onError: (err: Error) => {
      //user.setError(err.message);
      user.setIsLogin(true);
    },
  });

  const Logout: Function = () => {
    mutation.mutate();
  };

  return {
    Logout,
    isPending: mutation.isPending,
  };
};
