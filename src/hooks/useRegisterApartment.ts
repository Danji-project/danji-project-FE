import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";
import type { ApartmentItem } from "../api";
import { useState, type Dispatch } from "react";

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


export const useApartRegistDB = () => {
  const apartRegistDBMutation = useMutation<ApartmentItem, Error, ApartmentItem>({
    mutationFn: async (apart: ApartmentItem) => {
      const formData = new FormData();

      const requestDto = {
        name: apart.name,
        region: apart.region,
        location: apart.location,
        totalUnit: apart.totalUnit,
        parkingCapacity: "", // TODO: 이 값은 동적으로 처리해야 할 수 있습니다.
        buildingRange: "101동 ~ 123동 (23개동)", // TODO: 이 값은 동적으로 처리해야 할 수 있습니다.
        kaptCode: apart.kaptCode,
      };

      formData.append(
        "requestDto",
        new Blob([JSON.stringify(requestDto)], { type: "application/json" })
      );

      // TODO: API_ENDPOINTS에 '/api/apartment' 경로를 추가하고 사용하세요.
      const res = await axios.post("/api/apartment", formData);

      return res.data.data;
    },
  });

  return {
    apartRegistDB: apartRegistDBMutation.mutateAsync,
    apartRegistDBPending: apartRegistDBMutation.isPending,
  };
};