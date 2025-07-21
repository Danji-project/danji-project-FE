import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserInfoContext";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/endpoints";
import axios from "axios";
import { validateCheck } from "../../utils/validators";

import InputFiled from "../../components/input-filed/InputField";
import Header from "../../layouts/Header";

import styles from "./findInfoPage.module.scss";
import LogoIcon from "../../assets/logo.svg";

interface ResetPasswordResponse {
  token: string;
}

class PasswordInfo {
  data: string;
  isvaild: boolean;

  constructor(a: string, b: boolean) {
    this.data = a;
    this.isvaild = b;
  }

  setData(a: string): PasswordInfo {
    return new PasswordInfo(a, this.isvaild);
  }

  setIsvaild(a: boolean): PasswordInfo {
    return new PasswordInfo(this.data, a);
  }
}

const HeaderTitle = () => {
  return (
    <div>
      <Header title="비밀번호 재설정" type="sub" hasBackButton={true} />
    </div>
  );
};

const PasswordForm = () => {
  // Todo : 사용자 새로고침시, 데이터 날리기
  const navigate = useNavigate();
  const location = useLocation();
  const email = new String(location.state);

  const [password, setPassword] = useState<PasswordInfo>(
    new PasswordInfo("", false)
  );
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [passwordConfirm, setPaasswordConfirm] = useState<PasswordInfo>(
    new PasswordInfo("", false)
  );
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | null
  >(null);

  const checkPassword = () => {
    setPassword((prev) => prev.setIsvaild(true));
    let check = validateCheck("PASSWORD_CHECK", password.data);
    setPasswordError(check!.error);
    console.log(check!.error);
  };

  const checkPasswordConfirm = () => {
    setPaasswordConfirm((prev) => prev.setIsvaild(true));
    let check = validateCheck(
      "PASSWORD_CONFIRM_CHECK",
      passwordConfirm.data,
      password.data
    )!;
    setPasswordConfirmError(check == undefined ? null : check.error);
  };

  const resetPassword = () => {
    mutation.mutate();
  };

  const mutation = useMutation<ResetPasswordResponse, Error>({
    mutationFn: async () => {
      try {
        localStorage.setItem("isSuccess", "true");
        const response = await axios.post(
          `/api${API_ENDPOINTS.FIND.RESET_PW}`,
          { email: email, password: password },
          { withCredentials: true }
        );

        localStorage.setItem(
          "message",
          "비밀번호가 성공적으로 변경되었습니다.\n다시 로그인 해 주세요!"
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.token) {
        navigate("/find-result", { replace: true });
      }
    },
    onError: (err: Error) => {
      localStorage.setItem("isSuccess", "false");
      localStorage.setItem(
        "message",
        "비밀번호 변경에 실패했습니다.\n잠시후 다시 시도 해 주세요!"
      );
      navigate("/find-result", { replace: true });
    },
  });

  return (
    <>
      {email ? (
        <div
          className={`${styles["content-div"]}`}
          onLoad={() => {
            localStorage.removeItem("eamilcash");
          }}
        >
          <div style={{ paddingBottom: "20px" }}>
            <InputFiled
              label="이메일"
              name="email"
              type="text"
              value={email ? email : ""}
              disabled={true}
              onChange={() => {}}
            />
          </div>

          <div style={{ paddingBottom: "20px" }}>
            <InputFiled
              label="새 비밀번호"
              placeholder="영문,숫자,특수문자 포함 8~16자"
              type="password"
              name="password"
              showPasswordToggle
              value={password?.data}
              onChange={(e) => {
                setPassword((prev) => prev.setData(e.target.value));
              }}
              onBlur={checkPassword}
              error={passwordError ? passwordError : ""}
              aria-invalid={passwordError ? "true" : "false"}
              aria-describedby={passwordError ? "password-error" : undefined}
            />
          </div>

          <div style={{ paddingBottom: "20px" }}>
            <InputFiled
              label="비밀번호 확인"
              placeholder="영문,숫자,특수문자 포함 8~16자"
              type="password"
              name="password"
              showPasswordToggle
              value={passwordConfirm?.data}
              onChange={(e) => {
                setPaasswordConfirm((prev) => prev.setData(e.target.value));
              }}
              onBlur={checkPasswordConfirm}
              error={passwordConfirmError ? passwordConfirmError : ""}
              aria-invalid={passwordConfirmError ? "true" : "false"}
              aria-describedby={
                passwordConfirmError ? "password-confirm-error" : undefined
              }
            />
          </div>

          <button
            className={`${styles["nomal-button"]} ${styles["nomal-button--valid"]} ${styles["submit-button"]}`}
            onClick={resetPassword}
          >
            다음
          </button>
        </div>
      ) : (
        <div className={`${styles["content-div"]}`}>
          <p>비밀번호 변경페이지에서 새로고침 등을 했을 가능성이 있습니다.</p>
          <p>이메일 인증부터 다시 진행해 주세요.</p>
          <button
            className={`${styles["nomal-button"]} ${styles["nomal-button--valid"]} ${styles["submit-button"]}`}
            onClick={() => {
              navigate("/find", { replace: true });
              localStorage.setItem("clickpw", "true");
            }}
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      )}
    </>
  );
};

export const ResetPasswordPage = () => {
  return (
    <>
      <div style={{ position: "relative", height: "100%" }}>
        <HeaderTitle />
        <PasswordForm />
      </div>
    </>
  );
};
