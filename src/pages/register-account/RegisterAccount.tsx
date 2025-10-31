import { useEffect } from "react";
import { usePendingStore } from "../../stores/usePendingStore";

import styles from "./RegisterAccount.module.scss";
import Header from "../../layouts/Header";
import RegisterAccountBodies from "../../components/register-account/RegisterAccountBodies";

const RegisterAccount = () => {
  const { setRegisterDimmed, registerDimmed } = usePendingStore();

  useEffect(() => {
    setRegisterDimmed(true);

    return () => {
      setRegisterDimmed(false);
    };
  }, []);

  return (
    <>
      {registerDimmed ? (
        <div className={styles["register__account"]}>
          <button>
            <img src="/icons/kakao.png" alt="kakao" />
            <span>카카오로 회원가입</span>
          </button>
          <button>
            <img src="/icons/google.png" alt="google" />
            <span>구글로 회원가입</span>
          </button>
          <button>
            <img src="/icons/naver.png" alt="naver" />
            <span>네이버로 회원가입</span>
          </button>
          <div className={styles["register__account__line"]}>
            <span>Or</span>
          </div>
          <button
            onClick={() => {
              setRegisterDimmed(false);
            }}
          >
            이메일로 가입하기
          </button>
        </div>
      ) : (
        <>
          <Header title="회원가입" hasBackButton />
          <RegisterAccountBodies />
        </>
      )}
    </>
  );
};

export default RegisterAccount;
