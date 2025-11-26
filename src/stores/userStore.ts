import { create } from "zustand";

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
}

interface userInfoInterfaceReal extends UserInfoInterface {
  setIsLogin: (isLogin: boolean) => void;
  updateUserInfo: (email: string, password: string, nickname: string, profile: string, phone: string) => void;
}

export const useUserInfo = create<userInfoInterfaceReal>((set) => ({
  isLogin: false,
  
  email: '',
  password: '',
  profileImage: null,
  nickname: '',
  phone: '',

  setIsLogin: (isLogin) => set({ isLogin }),
  updateUserInfo: (email, password, nickname, profileImage, phone) => set({
    email,
    password,
    profileImage,
    nickname,
    phone
  })

}))
