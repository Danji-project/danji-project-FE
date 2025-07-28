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
    fileId: null | string | number;
    location: string | null;
    memberApartmentId: number | null;
    moveInDate: null | string;
    name: string;
    nickname: string;
    numberOfResidents: number | null;
    phoneNumber: string;
    region: string | null;
    unit: null;
    profileImageUrl?: string; // 프로필 이미지 URL (선택적)
  };
}

export const useUserInfoMutation = () => {
  const { updateUserInfo, setIsLogin, setError } = useUserInfo();

  const mutation = useMutation<UserInfoResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.get(`/api${API_ENDPOINTS.USER.MEMBER}`);
        return response.data;
      } catch (error) {
        throw new Error("사용자 정보를 가져오는데 실패했습니다.");
      }
    },
    onSuccess: (data) => {
      console.log("API 응답 데이터:", data);

      // 로그인 상태 설정
      setIsLogin(true);

      // 프로필 이미지 URL 결정
      let profileImageUrl = "/profile_imgSrc.jpg";
      if (data.data.profileImageUrl) {
        profileImageUrl = data.data.profileImageUrl;
      } else if (data.data.fileId) {
        profileImageUrl = `/api/files/${data.data.fileId}`;
      }

      // 사용자 정보 일괄 업데이트
      updateUserInfo({
        // 기본 정보
        email: data.data.email,
        name: data.data.name,
        nickname: data.data.nickname,
        phoneNumber: data.data.phoneNumber,

        // 아파트 정보
        apartmentId: data.data.apartmentId,
        apartmentName: data.data.apartmentName,
        building: data.data.building,
        carNumber: data.data.carNumber,
        fileId: data.data.fileId,
        location: data.data.location,
        memberApartmentId: data.data.memberApartmentId,
        moveInDate: data.data.moveInDate,
        numberOfResidents: data.data.numberOfResidents,
        region: data.data.region,
        unit: data.data.unit,

        // 프로필 이미지
        profileImage: profileImageUrl,
      });

      console.log("사용자 정보 업데이트 완료:", {
        name: data.data.name,
        nickname: data.data.nickname,
        phoneNumber: data.data.phoneNumber,
        profileImage: profileImageUrl,
      });
    },
    onError: (err: Error) => {
      setIsLogin(false);
      setError(err.message);
    },
  });

  const executeUserInfoMutation = () => {
    mutation.mutate();
  };

  return {
    executeUserInfoMutation,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
