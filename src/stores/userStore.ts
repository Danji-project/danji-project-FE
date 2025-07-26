import { create } from "zustand";

interface IUserInfoBase {
  email: string;
  password: string;
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
