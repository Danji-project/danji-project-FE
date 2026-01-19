import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ApartmentDetail,
  ApartmentResponse,
} from "../hooks/useApartmentList";

interface ApartDetailData extends ApartmentResponse {
  apartmentId: number | null;
  setData: (data: ApartmentDetail, apartmentId: number) => void;
}

export const useApartDetail = create<ApartDetailData>()(
  persist(
    (set) => ({
      code: 200,
      data: {} as ApartmentDetail,
      apartmentId: null,
      setData: (data: ApartmentDetail, apartmentId: number) =>
        set(() => ({
          code: 200,
          data,
          apartmentId,
        })),
    }),
    {
      name: "apart-detail-storage",
    }
  )
);

export default useApartDetail;
