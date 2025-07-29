import { create } from "zustand";

interface IUserInfoBase {
  // 사용자 데이터
  apartmentID?: string | null;
  apartmentName?: string| null;
  building?: string| null;
  email: string;
  password: string;
  fileID?: string| null;
  location?: string| null;
  memberApartmentID?: string| null;
  moveInDate?: string| null;
  name?: string| null;
  nickname?: string| null;
  phoneNumber?: string| null;
  region?: string| null;
  uint?: string

  // 사용자 데이터 받아온 이후 정해지는 것들
  isLogin: boolean;
  error: string;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsLogin: (result: boolean) => void;
  setError: (error: string) => void;
}

export const useUserInfo = create<IUserInfoBase>((set) => ({
  email: "",
  password: "",
  isLogin: false,
  error: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setIsLogin: (result) => set({ isLogin: result }),
  setError: (error) => set({ error }),
}));
