import { useState } from "react";
import LoginInput from "./LoginInput";
import styles from "./LoginInputWrapper.module.scss";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { usePendingStore } from "../../stores/usePendingStore";

const LoginInputWrapper = () => {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [idError, setIdError] = useState("");
  const [type, setType] = useState("text");
  const [isIdSaved, setIsIdSaved] = useState(false);

  const handleEmailData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData(e.target.value);
  };

  const handlePasswordData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(e.target.value);
  };

  const handleTypeChange = () => {
    if (type === "text") {
      setType("password");
    }
    if (type === "password") {
      setType("text");
    }
  };

  const { loginMutation, loginMutationPending } = useLogin(
    emailData,
    passwordData,
    setIdError
  );

  const { setLoginPending } = usePendingStore();

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate();
        setLoginPending(loginMutationPending);
      }}
    >
      <div className={styles["login__input__wrapper__form"]}>
        <img src="/logo.svg" alt="logo" />
        <LoginInput
          label={"이메일"}
          placeholder={"이메일을 입력해주세요"}
          className={"email"}
          htmlForId={"forEmail"}
          type={"text"}
          value={emailData}
          onChange={handleEmailData}
          errorMessage={idError}
        />
        <LoginInput
          label={"비밀번호"}
          placeholder={"비밀번호를 입력해주세요"}
          className={"password"}
          htmlForId={"forPassword"}
          type={type}
          value={passwordData}
          onChange={handlePasswordData}
          onTypeChange={handleTypeChange}
          isButton
        />
        <div className={styles["login__input__wrapper__form__bottom__menu"]}>
          <label htmlFor="idSave">
            <input
              type="checkbox"
              checked={isIdSaved}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIsIdSaved(e.target.checked)
              }
            />
            <span>아이디 저장</span>
          </label>
          <button type="button">
            <span>아이디/비밀번호 찾기</span>
            <img src="/icons/find_icon.png" alt="find" />
          </button>
        </div>
        <div className={styles["login__input__wrapper__form__buttons"]}>
          <button type="submit" disabled={!emailData || !passwordData}>
            로그인
          </button>
          <p>
            아직 회원이 아니신가요?
            <Link to="/register-account">회원가입</Link>
          </p>
        </div>
        <div className={styles["login__input__wrapper__form__social__line"]}>
          <span>
            <b>Or</b>
          </span>
          <ul>
            <li>
              <a href="https://danjitalk.duckdns.org/oauth2/authorization/kakao">
                <img src="/icons/kakao.png" alt="kakao" />
              </a>
            </li>
            <li>
              <a href="https://danjitalk.duckdns.org/oauth2/authorization/google">
                <img src="/icons/google.png" alt="google" />
              </a>
            </li>
            <li>
              <a href="https://danjitalk.duckdns.org/oauth2/authorization/naver">
                <img src="/icons/naver.png" alt="naver" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
};

export default LoginInputWrapper;
