import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApartmentItem } from "../api/types";
import { API_ENDPOINTS } from "../api/endpoints";
import useApartDetail from "../stores/useApartDetail";
import {
  type TermReal,
  useSearchTermStore,
  type Term,
} from "../stores/useSearchTermStore";

// 검색 API 응답 구조 (useSearchTermStore 참고)
interface SearchResponse {
  code: number;
  data: {
    apartments: ApartmentItem[];
    totalResultCount: number;
    lastPage: boolean;
  };
}

// 아파트 상세 응답값
export interface ApartmentResponse {
  code: 200;
  data: ApartmentDetail;
}

// 아파트 상세 데이터
export interface ApartmentDetail {
  kaptCode: string;
  kaptName: string;
  kaptAddr: string;
  kaptUsedate: string;
  kaptdaCnt: number;
  kaptDongCnt: string;
  codeAptNm: string;
  kaptTopFloor: number;
  kaptMparea60: number;
  kaptMparea85: number;
  kaptMparea135: number;
  kaptMparea136: number;
  kaptTel: string;
  kaptdPcnt: string;
  kaptPcntu: string;
  codeHeatNm: string;
  kaptdWtimebus: string;
  subwayLine: string;
  subwayStation: string | null;
  kaptWtimesub: string;
  convenientFacility: string;
  educationFacility: string;
  groundElChargerCnt: number;
  undergroundElChargerCnt: number;
  welfareFacility: string;
  kaptdCccnt: number;
  name: string;
  region: string;
  location: string;
  totalUnit: number;
  parkingCapacity: number;
  buildingCount: number;
  buildingRange: string;
  fileUrl: string | null;
  chatroomId: null;
}

// 단지 전체 리스트 가져오기 (검색 API 사용)
// 빈 키워드나 와일드카드로 검색하여 전체 리스트 가져오기
export const useApartmentList = () => {
  const { data, isLoading, error } = useQuery<SearchResponse>({
    queryKey: ["apartmentList"],
    queryFn: async () => {
      // 검색 API를 사용하여 전체 리스트 가져오기
      // 빈 키워드나 "*" 같은 와일드카드로 전체 검색
      // 또는 서버에서 전체 리스트를 반환하도록 구현되어 있을 수 있음
      const response = await axios.get(`/api${API_ENDPOINTS.SEARCH.DANJI}`, {
        params: {
          keyword: "", // 빈 키워드로 전체 검색 시도
        },
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1,
  });

  return {
    apartments: data?.data?.apartments || [],
    isLoading,
    error,
  };
};

// id에 따라 아파트 상세 가져오기
export const useApartmentDetail = () => {
  const { setData } = useApartDetail();

  const getApartmentMutation = useMutation<
    ApartmentResponse,
    Error,
    { apartmentId: number }
  >({
    mutationFn: async ({ apartmentId }: { apartmentId: number }) => {
      const response = await axios.get(`/api/apartment?id=${apartmentId}`);
      return response.data;
    },
    onSuccess: (data: ApartmentResponse, variables) => {
      setData(data.data, variables.apartmentId);
    },
  });

  return {
    getApartmentMutation,
    apartmentPending: getApartmentMutation.isPending,
  };
};

// 신축아파트 분양정보
export const useNewApartList = () => {
  const { data: termResultData, setTerm } = useSearchTermStore();

  const getGangnam = useMutation<TermReal>({
    mutationFn: async () => {
      const response = await axios.get("/api/search", {
        params: {
          keyword: "강남",
          lastIndex: 0,
          limit: 2,
        },
      });
      return response.data;
    },
    onSuccess: (data: Term) => {
      setTerm(data);
    },
  });

  return {
    termResultData,
    getGangnam,
    newApartListPending: getGangnam.isPending,
  };
};
