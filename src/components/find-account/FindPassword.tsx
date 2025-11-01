import { useState } from "react";
import styles from "./FindPassword.module.scss";
import FindInputField from "../common/find-input-field/FindInputField";
import { useSendValidation } from "../../hooks/useSendValidation";

const FindPassword = () => {
  const { sendValidationMutation, receivedValidationMutation } =
    useSendValidation();

  const [emailData, setEmailData] = useState({
    value: "",
    valid: false,
    isError: false,
    touched: false,
    errorMessage: "",
    isCertifiedSend: false,
    isCertifiedReceived: false,
  });

  const [certifyingNumber, setCertifyingNumber] = useState({
    value: "",
    valid: false,
    isError: false,
    touched: false,
    errorMessage: "",
    okMessage: "",
  });

  const changeEmailData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData((prev) => ({
      ...prev,
      value: e.target.value,
      valid: e.target.value.includes("@"),
      isError: !e.target.value.includes("@"),
      errorMessage: !e.target.value.includes("@")
        ? "@를 포함한 이메일을 작성해주세요"
        : "",
    }));
  };

  const changeCertifyingNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertifyingNumber((prev) => ({
      ...prev,
      value: e.target.value,
      valid: e.target.value.trim().length === 6,
      isError: e.target.value.trim().length !== 6,
      errorMessage:
        e.target.value.trim().length !== 6 ? "6글자의 숫자로 입력하세요" : "",
    }));
  };

  const touchEmailData = () => {
    setEmailData((prev) => ({ ...prev, touched: true }));
  };

  const touchCertifyingNumber = () => {
    setCertifyingNumber((prev) => ({ ...prev, touched: true }));
  };

  const sendCertified = () => {
    // 인증번호를 보냈을 때 인증번호 input 생성
    setEmailData((prev) => ({ ...prev, isCertifiedSend: true }));

    // 인증번호 보내기
    sendValidationMutation.mutate({
      email: emailData.value,
      type: "FIND_PASSWORD",
    });
  };

  const sendNumber = () => {
    receivedValidationMutation.mutate({
      email: emailData.value,
      code: certifyingNumber.value,
    });

    setEmailData((prev) => ({ ...prev, isCertifiedReceived: true }));
  };

  return (
    <>
      <FindInputField
        label="이메일"
        type={"text"}
        htmlFor={"emailFor"}
        className={"email"}
        placeholder={"이메일을 입력해주세요"}
        value={emailData.value}
        onChangeEvent={changeEmailData}
        valid={emailData.valid}
        isError={emailData.isError}
        touched={emailData.touched}
        errorMessage={emailData.errorMessage}
        onTouch={touchEmailData}
        ifEmailWillCertify
        secondaryButtonArray={["인증번호", "전송완료"]}
        onSendCertify={sendCertified}
      />
      {emailData.isCertifiedSend && (
        <FindInputField
          label="인증번호"
          type="text"
          htmlFor={"certifiedFor"}
          className={"certified"}
          placeholder={"인증번호를 입력해주세요."}
          value={certifyingNumber.value}
          onChangeEvent={changeCertifyingNumber}
          valid={certifyingNumber.valid}
          isError={certifyingNumber.isError}
          touched={certifyingNumber.touched}
          errorMessage={certifyingNumber.errorMessage}
          secondaryButtonArray={["확인", "확인"]}
          onTouch={touchCertifyingNumber}
          ifEmailWillCertify
          onSendCertify={sendNumber}
        />
      )}
    </>
  );
};

export default FindPassword;
