import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";

import styles from "./RegisterSuccess.module.scss";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header title="회원가입" hasBackButton />
      <div className={styles["register__success"]}>
        <img src="/logo-danji.png" alt="logo" />
        <h2>회원가입이 완료되었습니다.</h2>
        <p>
          이제 서비스를 이용하실 준비가 되었습니다. <br />
          로그인 후 시작하세요!
        </p>
        <button onClick={() => navigate("/login")}>로그인하고 시작하기</button>
      </div>
    </>
  );
};

export default RegisterSuccess;
