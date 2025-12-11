import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserInfoMutation } from "./useUserInfoMutation";
import { useUserInfo } from "../stores/userStore";

export const useProfileImageUpload = () => {
  const { getUserInfo } = useUserInfoMutation();
  const userInfo = useUserInfo();

  const uploadProfileImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      // requestDto를 Blob으로 추가 (서버가 요구하는 형식)
      // password는 변경하지 않으므로 제거
      const requestDto: {
        name?: string;
        nickname: string;
        phoneNumber: string;
      } = {
        nickname: userInfo.nickname || "",
        phoneNumber: userInfo.phone || "",
      };

      // name 필드는 서버 응답에서 null이므로 빈 문자열로 전송
      requestDto.name = "";

      formData.append(
        "requestDto",
        new Blob([JSON.stringify(requestDto)], { type: "application/json" })
      );

      // 파일 추가 (필수 아님) - 서버 요청 양식에 따라 multipartFile로 변경
      formData.append("multipartFile", file);

      // multipart/form-data는 axios가 자동으로 Content-Type과 boundary를 설정
      const res = await axios.put("/api/member", formData);

      return res.data;
    },
    onSuccess: async (data) => {
      // 서버 응답 로그 확인
      console.log("프로필 이미지 업로드 응답:", data);

      // 서버에서 업데이트된 사용자 정보를 다시 가져와서 스토어 업데이트
      // 재시도 로직: fileId가 null이면 여러 번 재시도
      let retryCount = 0;
      const maxRetries = 5;
      const retryDelay = 1000; // 1초

      const fetchUserInfoWithRetry = () => {
        setTimeout(() => {
          getUserInfo.mutate(undefined, {
            onSuccess: (userData) => {
              const fileId = userData?.data?.fileId;
              console.log(
                `재시도 ${retryCount + 1}/${maxRetries}, fileId:`,
                fileId
              );

              // fileId가 여전히 null이고 재시도 횟수가 남아있으면 재시도
              if (!fileId && retryCount < maxRetries - 1) {
                retryCount++;
                fetchUserInfoWithRetry();
              } else if (fileId) {
                console.log("프로필 이미지 업데이트 완료, fileId:", fileId);
              } else {
                console.warn(
                  "프로필 이미지 업데이트 실패: fileId를 가져올 수 없습니다."
                );
              }
            },
          });
        }, retryDelay);
      };

      fetchUserInfoWithRetry();
    },
    onError: (error: any) => {
      console.error("프로필 이미지 업로드 실패:", error);
      if (error.response) {
        console.error("응답 데이터:", error.response.data);
        console.error("상태 코드:", error.response.status);
        console.error("응답 헤더:", error.response.headers);
        // 사용자에게 에러 메시지 표시
        alert(
          `프로필 이미지 업로드 실패: ${
            error.response.data?.message ||
            error.response.statusText ||
            "알 수 없는 오류"
          }`
        );
      } else if (error.request) {
        console.error("요청 전송 실패:", error.request);
        alert("서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.");
      } else {
        console.error("에러 설정 실패:", error.message);
        alert(`프로필 이미지 업로드 실패: ${error.message}`);
      }
    },
  });

  return {
    uploadProfileImage: uploadProfileImageMutation.mutate,
    uploadPending: uploadProfileImageMutation.isPending,
  };
};
