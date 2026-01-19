import { create } from "zustand";

interface ResponseApartData {
  code: number;
  data: {
    id: number;
    name: string;
    location: string;
    totalUnit: number;
    parkingCapacity: number;
    buildingCount: number;
    fileUrl: string;
  };
}

interface UserInfoReal extends UserInfoAll {
  setIsLogin: (isLogin: boolean) => void;
  updateProfileImage: (profileImage: string) => void;
  updateApartData: (apartData: ResponseApartData) => void;
  updateUserModify: ({
    name,
    nickname,
    phoneNumber,
  }: {
    name: string;
    nickname: string;
    phoneNumber: string;
  }) => void;
  refreshUserInfo: () => void;
}

export interface UserInfoAll {
  code: number;
  isLogin: boolean;
  data: UserInfo | null;
}

interface UserInfo {
  fileId: string | null;
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  memberApartmentId: number | null;
  apartmentId: number | null;
  apartmentName: string | null;
  region: string | null;
  location: string | null;
  building: string | null;
  unit: number | null;
  moveInDate: string | null;
  numberOfResidents: number | null;
  carNumbers: string | null;
}

export const useUserInfoStore = create<UserInfoReal>((set) => ({
  code: 200,
  data: null,
  isLogin: false,
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
  updateProfileImage: (profileImage: string) => {
    set((state) => ({
      data: state.data ? { ...state.data, fileId: profileImage } : null,
    }));
  },
  updateApartData: (apartData: ResponseApartData) => {
    set((state) => ({
      code: 200,
      data: state.data
        ? {
            ...state.data,
            apartmentId: apartData?.data.id,
            apartmentName: apartData?.data.name,
            location: apartData?.data.location,
          }
        : null,
    }));
  },
  refreshUserInfo: () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userDataStr = localStorage.getItem("userData");

    if (!userDataStr) return;

    const userData: UserInfo = JSON.parse(userDataStr);
    set({
      isLogin: Boolean(isLoggedIn),
      data: userData,
    });
  },
  updateUserModify: ({
    name,
    nickname,
    phoneNumber,
  }: {
    name: string;
    nickname: string;
    phoneNumber: string;
  }) => {
    set((state) => ({
      data: state.data ? { ...state.data, name, nickname, phoneNumber } : null,
    }));
  },
}));
