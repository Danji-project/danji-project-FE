import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";
import type { ApartmentItem } from "../api";
import type { Dispatch } from "react";

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


export const useApartRegistDB = (setApart : Dispatch<ApartmentItem>) => {
  const useApartRegistDBMutation = useMutation({
    mutationFn: async (apart:ApartmentItem) => {
      const formData = new FormData();

      // requestDto를 Blob으로 추가 (서버가 요구하는 형식)
      // password는 변경하지 않으므로 제거
      const requestDto: {
        name: string;
        region: string;
        location: string;
        totalUnit: number | null;
        parkingCapacity: string;
        buildingRange: string;
        kaptCode: string;
      } = {
        name: apart.kaptCode,
        region: apart.region,
        location:apart.location,
        totalUnit : apart.totalUnit,
        parkingCapacity: "",
        buildingRange : '101동 ~ 123동 (23개동)',
        kaptCode : apart.kaptCode,
      };

      // name 필드는 서버 응답에서 null이므로 빈 문자열로 전송
      requestDto.name = "";

      formData.append(
        "requestDto",
        new Blob([JSON.stringify(requestDto)], { type: "application/json" })
      );

      // multipart/form-data는 axios가 자동으로 Content-Type과 boundary를 설정
      const res = await axios.post("/api/apartment", formData);

      return res.data;
    },
    onSuccess: async (data) => {
      // 서버 응답 로그 확인
      console.log("아파트 등록 응답:", data);
      setApart(data);
    },
    onError: (error: any) => {
      console.error("아파트 등록 실패:", error);
    },
  });

  const ApartMutate = async (apart: ApartmentItem) => {
    await useApartRegistDBMutation.mutate(apart);
  };

  return {
    apartRegistDB: ApartMutate,
    apartRegistDBPending: useApartRegistDBMutation.isPending,
  };
};
