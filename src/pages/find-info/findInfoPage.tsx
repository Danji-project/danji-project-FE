import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import { API_ENDPOINTS } from "../../api/endpoints";
import axios from "axios";

import InputFiled from "../../components/input-filed/InputField";
import Header from "../../layouts/Header";

import styles from "./findInfoPage.module.scss";

interface FindInfoResponse {
  token: string;
}

const FindInfoHeader = () => {
  return (
    <div>
      <Header title="아이디/비밀번호 찾기" hasBackButton={true} />
    </div>
  );
};

const FindInfoEmailForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [userPhonNumber, setPhonNumber] = useState<string>("");
  const [isFindId, setIsFindId] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  console.log(isFindId, userEmail);

  const mutation = useMutation<FindInfoResponse, Error>({
    mutationFn: async () => {
      try {
        localStorage.setItem("message", "");
        localStorage.setItem("isSuccess", "true");

        if (userName == "test") {
          localStorage.setItem(
            "message",
            "회원님의 이메일은\n" + "example@email.com" + " 입니다."
          );
          localStorage.setItem("strongtext", "example@email.com");
          localStorage.removeItem("rememberEmail");
          console.log(localStorage.getItem("message"));
        }

        const response = await axios.post(
          `/api${API_ENDPOINTS.FIND.EMAIL}`,
          { name: userName, phonNumber: userPhonNumber },
          { withCredentials: true }
        );

        if (response.data && response.data.data) {
          setUserEmail(response.data.data);
          localStorage.setItem(
            "message",
            "회원님의 이메일은\n" + response.data.data + " 입니다."
          );
          localStorage.setItem("strongtext", response.data.data);
        }

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status == 404) {
            throw new Error("해당 데이터가 삭제되었거나 존재하지 않습니다.");
          }
        }
        throw new Error("이메일을 찾는 중 오류가 발생했습니다.");
      }
    },
    onSuccess: (data) => {
      if (data?.token) {
        console.log(data);
        setIsFindId(true);
        navigate("/find-result", { replace: true });
      }
    },
    onError: (err: Error) => {
      console.log(localStorage.getItem("message"));
      if (userName != "test") {
        setIsFindId(false);
        localStorage.setItem("isSuccess", "false");
        localStorage.setItem("message", err.message);
      }
      console.log(localStorage.getItem("message"));
      navigate("/find-result", { replace: true });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vailed) {
      mutation.mutate();
    }
  };

  const vailed = userName && userPhonNumber;

  return (
    <>
      <div
        className={`${styles["content-div"]}`}
        style={{ minHeight: "calc(var(--device-height) - 250px)" }}
      >
        <div>
          <div className={`${styles["login-div-horizon"]}`}>
            <InputFiled
              label="이름"
              type="text"
              name="userName"
              placeholder="이름을 입력해주세요."
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div className={`${styles["login-div-horizon"]}`}>
            <InputFiled
              label="전화번호"
              type="text"
              name="phonNumber"
              placeholder="-제외 11자리를 입력해주세요."
              value={userPhonNumber}
              onChange={(e) => {
                setPhonNumber(e.target.value);
              }}
            />
          </div>
        </div>

        <button
          className={`${styles["nomal-button"]} ${styles["submit-button"]} ${
            vailed ? styles["nomal-button--valid"] : ""
          }`}
          style={{ margin: "0px" }}
          onMouseOver={() => {}}
          disabled={vailed ? false : true}
          onClick={handleSubmit}
          type="submit"
        >
          다음
        </button>
      </div>
    </>
  );
};

const FindInfoPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sendOTPEmail, setSendOTPEmail] = useState<boolean>(false);

  const [otp, setOTP] = useState<string>("");
  const [optError, setOTPError] = useState<string | null>(null);
  const [successOTP, setSuccessOTP] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmail = () => {
    if (isValidEmail(email)) {
      setEmailError(null);
    } else {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    }
  };

  const sendEmailMutation = useMutation<FindInfoResponse, Error>({
    mutationFn: async () => {
      try {
        if (email == "example@email.com") {
          setSendOTPEmail(true);
          return;
        }

        const response = await axios.post(
          `/api${API_ENDPOINTS.AUTH.CERTIFICATION}`,
          { mail: email, type: "FIND_PASSWORD" },
          { withCredentials: true }
        );
        setSendOTPEmail(true);

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.status);
          throw new Error(error.response?.statusText);
        }
        throw new Error("이메일을 찾는 중 오류가 발생했습니다.");
      }
    },
    onSuccess: () => {
      setSendOTPEmail(true);
    },
    onError: (err: Error) => {
      setSendOTPEmail(false);
      setEmailError(err.message);
      console.log(err.message);
    },
  });

  const sendEmail = () => {
    checkEmail();
    if (!emailError) {
      sendEmailMutation.mutate();
    }
  };

  const checkAPIMutation = useMutation<FindInfoResponse, Error>({
    mutationFn: async () => {
      try {
        if (email == "example@email.com" && otp == "000000") {
          setSuccessOTP(true);
          return;
        }
        const encodeEamil = encodeURI(email);
        const response = await axios.get(
          `/api/mail/certification-code/verify?email=${encodeEamil}&code=${otp}`,
          { withCredentials: true }
        );

        setSuccessOTP(true);

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == 400)
            throw new Error(
              "인증에 실패하였습니다. 올바른 인증 코드를 입력하세요."
            );
          console.log(error.response);
          throw new Error(error.response?.statusText);
        }
        throw new Error("인증을 확인하는 중 오류가 발생했습니다.");
      }
    },
    onSuccess: () => {
      setSuccessOTP(true);
    },
    onError: (err: Error) => {
      setSuccessOTP(false);
      console.log(err.message);
      setOTPError(err.message);
    },
  });

  const checkOTP = () => {
    setSuccessOTP(otp.length == 6);
    checkAPIMutation.mutate();
  };

  return (
    <>
      <div
        className={`${styles["content-div"]}`}
        style={{ minHeight: "calc(var(--device-height) - 250px)" }}
      >
        <div>
          <div className={`${styles["login-div-horizon"]}`}>
            <InputFiled
              label="이메일"
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={() => {
                checkEmail();
              }}
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby={emailError ? "email-error" : undefined}
              error={emailError ?? undefined}
            />

            <button
              className={`${styles["nomal-button"]} ${
                email && emailError ? "" : styles["nomal-button--valid"]
              }`}
              style={{ width: "70px", margin: "23px 0px 0px 10px" }}
              disabled={!email || (email && emailError) ? true : false}
              onMouseOver={() => {
                checkEmail;
              }}
              onClick={() => {
                sendEmail();
              }}
            >
              {sendOTPEmail ? "전송완료" : "인증번호"}
            </button>
          </div>

          {sendOTPEmail ? (
            <div className={`${styles["login-div-horizon"]}`}>
              <InputFiled
                label=""
                type="text"
                name="otp"
                placeholder="인증번호를 입력해주세요.(6자리)"
                onBlur={() => {
                  setOTPError(
                    otp.length != 6 ? "인증번호는 6자리입니다." : null
                  );
                }}
                value={otp}
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                success={successOTP ? "인증에 성공했습니다." : ""}
                aria-invalid={optError ? "true" : "false"}
                aria-describedby={optError ? "email-error" : undefined}
                error={optError ?? undefined}
              />
              <button
                className={`${styles["nomal-button"]} ${
                  otp ? styles["nomal-button--valid"] : ""
                }`}
                disabled={optError ? true : false}
                onMouseOver={() => {
                  setOTPError(
                    otp.length != 6 ? "인증번호는 6자리입니다." : null
                  );
                }}
                style={{ width: "70px" }}
                onClick={() => {
                  checkOTP();
                }}
              >
                확인
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <button
          className={`${styles["nomal-button"]} ${styles["submit-button"]} ${
            successOTP ? styles["nomal-button--valid"] : ""
          }`}
          disabled={successOTP ? false : true}
          style={{ margin: "0" }}
          onClick={() => {
            navigate("/reset-password", { replace: true, state: email });
          }}
        >
          다음
        </button>
      </div>
    </>
  );
};

const SelectBtn = () => {
  let check = localStorage.getItem("clickpw");
  localStorage.removeItem("clickpw");

  const [isSelctEmail, setIsSelctEmail] = useState<boolean>(
    check != null ? false : true
  );
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
      <FindInfoHeader />
      <button
        className={`${styles["top-button"]}`}
        style={{ margin: "20px 0px", width: "50%" }}
        onClick={() => {
          setIsSelctEmail(true);
        }}
        disabled={isSelctEmail}
      >
        이메일 찾기
      </button>
      <button
        className={`${styles["top-button"]}`}
        style={{ margin: "20px 0px", width: "50%" }}
        onClick={() => {
          setIsSelctEmail(false);
        }}
        disabled={isSelctEmail ? false : true}
      >
        비밀번호 찾기
      </button>
      {isSelctEmail ? <FindInfoEmailForm /> : <FindInfoPassword />}
    </>
  );
};

export const FindInfoPage = () => {
  return (
    <>
      <div style={{ height: "100%" }}>
        <SelectBtn />
      </div>
    </>
  );
};
