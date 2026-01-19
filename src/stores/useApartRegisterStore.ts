import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApartFunction extends ApartRequest {
  setApartmentId: (apartmentId: number | null) => void;
  setDong: (dong: number) => void;
  setHo: (ho: number) => void;
  setLiveDate: (liveDate: string) => void;
  setLivePeople: (livePeople: string) => void;
  setCarNumber: (carNumber: string) => void;
  removeCarNumber: (carNumber: string) => void;
  setAll: (data: Partial<ApartRequest>) => void;
  reset: () => void;
}

interface ApartRequest {
  memberApartmentId?: number | null;
  apartmentId: number | null;
  dong: number;
  ho: number;
  liveDate: string;
  livePeople: string;
  carNumber: string[];
}

export const useApartRegisterStore = create<ApartFunction>()(
  persist(
    (set) => ({
      apartmentId: null,
      dong: 101,
      ho: 101,
      liveDate: dayjs().format("YYYY-MM-DD"),
      livePeople: "",
      carNumber: [],
      setApartmentId: (apartmentId: number | null) => set({ apartmentId }),
      setDong: (dong: number) => set({ dong }),
      setHo: (ho: number) => set({ ho }),
      setLiveDate: (liveDate: string) => set({ liveDate }),
      setLivePeople: (livePeople: string) => set({ livePeople }),
      setCarNumber: (carElement: string) =>
        set((state) => ({ carNumber: [...state.carNumber, carElement] })),
      removeCarNumber: (carElement: string) =>
        set((state) => ({
          carNumber: state.carNumber.filter((car) => car !== carElement),
        })),
      setAll: (data: Partial<ApartRequest>) => set((state) => ({ ...state, ...data })),
      reset: () => {
        set({
          memberApartmentId: null,
          apartmentId: null,
          dong: 101,
          ho: 101,
          liveDate: dayjs().format("YYYY-MM-DD"),
          livePeople: "",
          carNumber: [],
        });
      },
    }),
    {
      name: "apart-register-storage",
    },
  ),
);
