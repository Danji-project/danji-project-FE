import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useUserInfo } from "../../stores/userStore";

import { Checkbox } from "../../components/Checkbox/Checkbox";
import InputFiled from "../../components/input-filed/InputField";
import Spinners from "../../components/common/spinners/Spinners";
import Header from "../../layouts/Header";

import styles from "./loginPage.module.scss";
import KakaoIcon from "../../assets/social/kakao.svg";
import GoogleIcon from "../../assets/social/google.svg";
import NaverIcon from "../../assets/social/naver.svg";
import LogoIcon from "../../assets/logo.svg";

const LoginHeader = () => {
  return (
    <div>
      <Header title="로그인" hasBackButton={true} />
      <div style={{ textAlign: "center" }}>
        <img src={LogoIcon} />
      </div>
    </div>
  );
};

const LoginForm = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useUserInfo();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  let tempData = localStorage.getItem("rememberEmail")
    ? localStorage.getItem("rememberEmail")
    : localStorage.getItem("strongtext");
  if (isValidEmail(tempData ? tempData : "")) {
    user.setEmail(tempData ? tempData : "");
    localStorage.removeItem("strongtext");
  }

  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSaveEmail, setIsSaveEmail] = useState<boolean>(
    localStorage.getItem("rememberEmail") ? true : false
  );

  const { Login, isLogining } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError) {
      user.setPassword(password);
      user.setEmail(email);
      setIsLoading(isLogining);
      Login();

      if (isSaveEmail) {
        localStorage.setItem("rememberEmail", user.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }
    }
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
              aria-invalid={user.error ? "true" : "false"}
              aria-describedby={user.error ? "password-error" : undefined}
              showPasswordToggle={true}
              error={user.error ?? undefined}
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
              <Link
                className={`${styles["login-gray-midium-text"]}`}
                to="/find"
              >
                아이디/비밀번호 찾기 &gt;
              </Link>
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
              disabled={isValidInputs || isLogining ? false : true}
            >
              {isLogining ? "로그인 중..." : "로그인"}
            </button>
            <p className={`${styles["login-gray-small-text"]}`}>
              아직 회원이 아니신가요?{" "}
              <Link
                className={`${styles["login-blue-small-text"]}`}
                to="/register"
              >
                회원가입
              </Link>
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
      <a href={`https://danjitalk.duckdns.org/oauth2/authorization/kakao?origin=${encodeURIComponent(window.location.origin)}`}>
        <img src={KakaoIcon} />
      </a>
      <a href={`https://danjitalk.duckdns.org/oauth2/authorization/google?origin=${encodeURIComponent(window.location.origin)}`}>
        <img style={{ margin: "0px 20px" }} src={GoogleIcon} />
      </a>
      <a href={`https://danjitalk.duckdns.org/oauth2/authorization/naver?origin=${encodeURIComponent(window.location.origin)}`}>
        <img src={NaverIcon} />
      </a>
    </div>
  );
};

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useUserInfo();

  // 이미 로그인된 사용자는 홈페이지로 리다이렉트
  useEffect(() => {
    if (user.isLogin) {
      navigate("/", { replace: true });
    }
  }, [user.isLogin, navigate]);

  // 로그인된 사용자인 경우 아무것도 렌더링하지 않음
  if (user.isLogin) {
    return null;
  }

  return (
    <>
      <div>
        {isLoading ? (
          <div className={[styles.register, styles.dimmed].join(" ")}>
            <Spinners />
          </div>
        ) : (
          <></>
        )}
        <div>
          <LoginHeader />
          <LoginForm setIsLoading={setIsLoading} />
          <SpiltBar />
          <SocialLogin />
        </div>
      </div>
    </>
  );
};
