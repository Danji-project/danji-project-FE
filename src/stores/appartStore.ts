import { create } from "zustand";

interface IApartmentBase {
  // 사용자 데이터
  apartmentID: string;
  apartmentName: string;

  // 사용자 데이터 받아온 이후 정해지는 것들
  error: string;
}

export const useApartmentInfo = create<IApartmentBase>((set) => ({
    apartmentID: "",
    apartmentName: "",

    error: "",
}));
