import { create } from "zustand";

interface RegisterStore {
  email: Email;
  password: Password;
  passwordConfirm: PasswordConfirm;
  username: Username;
  nickname: Nickname;
  phoneNumber: PhoneNumber;
  setEmail: (value: string, valid: boolean, error: string) => void;
  setEmailCheckStatus: (
    checkStatus: "INITIAL" | "CHECKED" | "DUPLICATE"
  ) => void;
  setAuthCode: (authCode: string) => void;
  setCodeVerified: (verified: boolean) => void;
  setPassword: (value: string, valid: boolean, error: string) => void;
  setPasswordConfirm: (value: string, valid: boolean, error: string) => void;
  setUsername: (value: string, valid: boolean, error: string) => void;
  setNickname: (value: string, valid: boolean, error: string) => void;
  setPhoneNumber: (value: string, valid: boolean, error: string) => void;
}

interface Email {
  value: string;
  valid: boolean;
  error: string;
  checkStatus: "INITIAL" | "CHECKED" | "DUPLICATE";
  verifyCode: string;
  codeVerified: boolean;
}

interface Password {
  value: string;
  valid: boolean;
  error: string;
}

interface PasswordConfirm {
  value: string;
  valid: boolean;
  error: string;
}

interface Username {
  value: string;
  valid: boolean;
  error: string;
}

interface Nickname {
  value: string;
  valid: boolean;
  error: string;
}

interface PhoneNumber {
  value: string;
  valid: boolean;
  error: string;
}

const useRegisterStore = create<RegisterStore>((set) => ({
  email: {
    value: "",
    valid: false,
    error: "",
    checkStatus: "INITIAL",
    verifyCode: "",
    codeVerified: false,
  },
  password: {
    value: "",
    valid: false,
    error: "",
  },
  passwordConfirm: {
    value: "",
    valid: false,
    error: "",
  },
  username: {
    value: "",
    valid: false,
    error: "",
  },
  nickname: {
    value: "",
    valid: false,
    error: "",
  },
  phoneNumber: {
    value: "",
    valid: false,
    error: "",
  },
  setEmail: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      email: {
        ...state.email,
        value,
        valid,
        error,
      },
    })),
  setEmailCheckStatus: (checkStatus: "INITIAL" | "CHECKED" | "DUPLICATE") =>
    set((state) => ({
      email: {
        ...state.email,
        checkStatus,
      },
    })),
  setAuthCode: (authCode: string) =>
    set((state) => ({
      email: {
        ...state.email,
        verifyCode: authCode,
      },
    })),
  setCodeVerified: (verified: boolean) =>
    set((state) => ({
      email: {
        ...state.email,
        codeVerified: verified,
      },
    })),
  setPassword: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      password: {
        ...state.password,
        value,
        valid,
        error,
      },
    })),
  setPasswordConfirm: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      passwordConfirm: {
        ...state.passwordConfirm,
        value,
        valid,
        error,
      },
    })),
  setUsername: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      username: {
        ...state.username,
        value,
        valid,
        error,
      },
    })),
  setNickname: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      nickname: {
        ...state.nickname,
        value,
        valid,
        error,
      },
    })),
  setPhoneNumber: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      phoneNumber: {
        ...state.phoneNumber,
        value,
        valid,
        error,
      },
    })),
}));

export default useRegisterStore;
