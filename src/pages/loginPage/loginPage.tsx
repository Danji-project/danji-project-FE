import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserInfoContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/endpoints";
import axios from "axios";

import { Checkbox } from "../../components/Checkbox/Checkbox";
import InputFiled from "../../components/InputFiled/InputField";
import Header from "../../components/Header/Header";

import styles from "./loginPage.module.scss";
import KakaoIcon from "../../assets/social/kakao.svg";
import GoogleIcon from "../../assets/social/google.svg";
import NaverIcon from "../../assets/social/naver.svg";
import LogoIcon from "../../assets/logo.svg";

interface LoginResponse {
  token: string;
}

const errorMessages: { [key: number]: string } & {
  default: string;
  networkError: string;
} = {
  401: "아이디 또는 비밀번호가 일치하지 않습니다",
  404: "존재하지 않는 계정입니다",
  429: "너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요",
  networkError: "인터넷 연결을 확인해주세요",
  default: "로그인 중 오류가 발생했습니다",
};

const LoginHeader = () => {
  return (
    <div>
      <Header title="로그인" type="sub" hasBackButton={true} />
      <div style={{ textAlign: "center", padding: "20px 0px" }}>
        <img src={LogoIcon} />
      </div>
    </div>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSaveEmail, setIsSaveEmail] = useState(false);

  const mutation = useMutation<LoginResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `/api${API_ENDPOINTS.AUTH.LOGIN}`,
          { id: email, pw: password },
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && errorMessages[status]) {
            throw new Error(errorMessages[status]);
          } else if (error.request) {
            throw new Error(errorMessages.networkError);
          }
        }
        throw new Error(errorMessages.default);
      }
    },
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("user_token", data.token);
        user.setIsLogin(true);
        navigate("/main", { replace: true });
      }
    },
    onError: (err: Error) => {
      setLoginError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError) {
      user.setPassword(password);
      user.setEmail(email);
      mutation.mutate();
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmail = () => {
    if (isValidEmail(email)) {
      setEmailError(null);
    } else {
      setEmailError("이메일 형식이 올바르지 않습니다. 예: example@domain.com");
    }
  };

  const isValidInputs = email && password && !emailError;

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <InputFiled
              type="email"
              label="이메일"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={checkEmail}
              placeholder="이메일을 입력하세요"
              autoComplete="email"
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby={emailError ? "email-error" : undefined}
              error={emailError ?? undefined}
            />
          </div>
          <div style={{ margin: "20px 0 0 0" }}>
            <InputFiled
              type="password"
              label="비밀번호"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력하세요"
              autoComplete="password"
              aria-invalid={loginError ? "true" : "false"}
              aria-describedby={loginError ? "password-error" : undefined}
              showPasswordToggle={true}
              error={loginError ?? undefined}
            />
          </div>
          <div className={`${styles["login-div-horizon"]}`}>
            <Checkbox
              label="이메일 저장"
              checked={isSaveEmail}
              onChange={() => {
                setIsSaveEmail(!isSaveEmail);
              }}
            />
            <p style={{ marginLeft: "auto" }}>
              <a className={`${styles["login-gray-midium-text"]}`} href="/find">
                아이디/비밀번호 찾기 &gt;
              </a>
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              className={`${styles["login-form__submit-button"]} ${
                isValidInputs ? styles["login-form__submit-button--valid"] : ""
              }`}
              onMouseOver={() => {
                checkEmail();
              }}
              type="submit"
              disabled={isValidInputs ? false : true}
            >
              로그인
            </button>
            <p className={`${styles["login-gray-small-text"]}`}>
              아직 회원이 아니신가요?{" "}
              <a className={`${styles["login-blue-small-text"]}`} href="">
                회원가입
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

const SpiltBar = () => {
  return (
    <div className={`${styles["login-div-horizon"]}`}>
      <div className={`${styles["login-div-centerline"]}`} />
      <p className={`${styles["login-div-centerline-text"]}`}>Or</p>
      <div className={`${styles["login-div-centerline"]}`} />
    </div>
  );
};

const SocialLogin = () => {
  return (
    <div
      style={{ flexDirection: "row", margin: "0 auto", textAlign: "center" }}
    >
      <a href="https://danjitalk.duckdns.org/oauth2/authorization/kakao">
        <img src={KakaoIcon} />
      </a>
      <a href="https://danjitalk.duckdns.org/oauth2/authorization/google">
        <img style={{ margin: "0px 20px" }} src={GoogleIcon} />
      </a>
      <a href="https://danjitalk.duckdns.org/oauth2/authorization/naver">
        <img src={NaverIcon} />
      </a>
    </div>
  );
};

export const LoginPage = () => {
  return (
    <>
      <div>
        <LoginHeader />
        <LoginForm />
        <SpiltBar />
        <SocialLogin />
      </div>
    </>
  );
};
