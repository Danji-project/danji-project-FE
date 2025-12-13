import { create } from "zustand";
import axios from "axios";

export interface ApartmentInfo {
  id?: string;
  name: string;
  address: string;
  detailAddress: string;
  houseSizeNumber: number;
  parkingSpaces: number;
  buildings: string[];
  images: string[];
}

export interface UserInfoData {
  code: number;
  data: UserInfoInterface;
}

export interface UserInfoInterface {
  isLogin: boolean;
  email: string;
  password: string;
  profileImage: string | null;
  nickname: string;
  phone: string;
  name: string;
}

interface UserInfoInterfaceReal extends UserInfoInterface {
  apartment: ApartmentInfo | null;
  setIsLogin: (isLogin: boolean) => void;
  setApartment: (apartment: ApartmentInfo | null) => void;
  updateUserInfo: (
    email: string,
    password: string,
    nickname: string,
    profile: string,
    phone: string,
    name: string
  ) => void;
  refreshUserInfo: () => Promise<void>;
}

export const useUserInfo = create<UserInfoInterfaceReal>((set) => ({
  isLogin: false,

  email: "",
  password: "",
  profileImage: null,
  nickname: "",
  phone: "",
  name: "",
  apartment: null,

  setIsLogin: (isLogin) => set({ isLogin }),

  setApartment: (apartment) => set({ apartment }),

  updateUserInfo: (email, password, nickname, profileImage, phone, name) =>
    set({
      email,
      password,
      profileImage,
      nickname,
      phone,
      name,
    }),

  refreshUserInfo: async () => {
    try {
      const res = await axios.get("/api/member");
      const userData = res.data.data;
      set({
        email: userData.email || "",
        nickname: userData.nickname || "",
        profileImage: userData.profileImage || null,
        phone: userData.phone || "",
        name: userData.name || "",
      });
    } catch (error) {
      console.error("Failed to refresh user info:", error);
    }
  },
}));
