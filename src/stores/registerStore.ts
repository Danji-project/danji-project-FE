import { create } from "zustand";

interface RegisterStore {
  email: Email;
  password: Password;
  passwordConfirm: PasswordConfirm;
  username: Username;
  nickname: Nickname;
  phoneNumber: PhoneNumber;
  setEmail: (value: string, valid: boolean, error: string) => void;
  setEmailTouched: () => void;
  setEmailCheckStatus: (
    checkStatus: "INITIAL" | "CHECKED" | "DUPLICATE"
  ) => void;
  setAuthCode: (authCode: string) => void;
  setCodeVerified: (verified: boolean) => void;
  setVerifyCodeError: (error: string) => void;
  setPassword: (value: string, valid: boolean, error: string) => void;
  setPasswordTouched: () => void;
  setPasswordConfirm: (value: string, valid: boolean, error: string) => void;
  setPasswordConfirmTouched: () => void;
  setUsername: (value: string, valid: boolean, error: string) => void;
  setUsernameTouched: () => void;
  setNickname: (value: string, valid: boolean, error: string) => void;
  setNicknameTouched: () => void;
  setPhoneNumber: (value: string, valid: boolean, error: string) => void;
  setPhoneNumberTouched: () => void;
}

interface Email {
  value: string;
  valid: boolean;
  error: string;
  touched: boolean;
  checkStatus: "INITIAL" | "CHECKED" | "DUPLICATE";
  verifyCode: string;
  verifyCodeError: string;
  codeVerified: boolean;
}

interface Password {
  value: string;
  valid: boolean;
  error: string;
  touched: boolean;
}

interface PasswordConfirm {
  value: string;
  valid: boolean;
  error: string;
  touched: boolean;
}

interface Username {
  value: string;
  valid: boolean;
  error: string;
  touched: boolean;
}

interface Nickname {
  value: string;
  valid: boolean;
  error: string;
  touched: boolean;
}

interface PhoneNumber {
  value: string;
  valid: boolean;
  error: string;
  touched: boolean;
}

const useRegisterStore = create<RegisterStore>((set) => ({
  email: {
    value: "",
    valid: false,
    error: "",
    touched: false,
    checkStatus: "INITIAL",
    verifyCode: "",
    verifyCodeError: "",
    codeVerified: false,
  },
  password: {
    value: "",
    valid: false,
    error: "",
    touched: false,
  },
  passwordConfirm: {
    value: "",
    valid: false,
    error: "",
    touched: false,
  },
  username: {
    value: "",
    valid: false,
    error: "",
    touched: false,
  },
  nickname: {
    value: "",
    valid: false,
    error: "",
    touched: false,
  },
  phoneNumber: {
    value: "",
    valid: false,
    error: "",
    touched: false,
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
  setEmailTouched: () =>
    set((state) => ({ email: { ...state.email, touched: true } })),
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
  setVerifyCodeError: (error: string) =>
    set((state) => ({ email: { ...state.email, verifyCodeError: error } })),
  setPassword: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      password: {
        ...state.password,
        value,
        valid,
        error,
      },
    })),
  setPasswordTouched: () =>
    set((state) => ({ password: { ...state.password, touched: true } })),
  setPasswordConfirm: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      passwordConfirm: {
        ...state.passwordConfirm,
        value,
        valid,
        error,
      },
    })),
  setPasswordConfirmTouched: () =>
    set((state) => ({
      passwordConfirm: { ...state.passwordConfirm, touched: true },
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
  setUsernameTouched: () =>
    set((state) => ({ username: { ...state.username, touched: true } })),
  setNickname: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      nickname: {
        ...state.nickname,
        value,
        valid,
        error,
      },
    })),
  setNicknameTouched: () =>
    set((state) => ({ nickname: { ...state.nickname, touched: true } })),
  setPhoneNumber: (value: string, valid: boolean, error: string) =>
    set((state) => ({
      phoneNumber: {
        ...state.phoneNumber,
        value,
        valid,
        error,
      },
    })),
  setPhoneNumberTouched: () =>
    set((state) => ({ phoneNumber: { ...state.phoneNumber, touched: true } })),
}));

export default useRegisterStore;
