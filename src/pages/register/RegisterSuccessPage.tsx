import React from "react";

import styles from "./RegisterSuccessPage.module.scss";

const RegisterSuccessPage = () => {
  return (
    <div className={styles["register-success"]}>
      <div className={styles["register-success-img"]}>
        <img src="/logo-danji.png" alt="big-logo" />
        <h2>회원 가입이 완료되었습니다.</h2>
        <p>
          이제 서비스를 이용하실 준비가 되었습니다. <br />
          로그인 후 시작하세요!
        </p>
      </div>
      <div className={styles["register-login"]}>
        <button>로그인 하고 사용하기</button>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
