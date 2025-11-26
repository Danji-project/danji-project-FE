import { useState } from "react";
import FindInputField from "../common/find-input-field/FindInputField";
import styles from "./FindId.module.scss";
import { useFindId } from "../../hooks/useFindAccount";

const FindId = () => {
  const [nameString, setNameString] = useState({
    value: "",
    valid: false,
    isError: false,
    errorMessage: "",
    touched: false,
  });

  const [phoneString, setPhoneString] = useState({
    value: "",
    valid: false,
    isError: false,
    errorMessage: "",
    touched: false,
  });

  const changeNameString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameString((prev) => ({
      ...prev,
      value: e.target.value,
      valid: e.target.value !== "",
      isError: e.target.value === "",
      errorMessage: e.target.value === "" ? "이름을 제대로 입력하세요." : "",
    }));
  };

  const changePhoneString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneString((prev) => ({
      ...prev,
      value: e.target.value,
      valid: e.target.value.length === 11,
      isError: e.target.value.length !== 11,
      errorMessage: e.target.value.length !== 11 ? "11자리로 입력하세요" : "",
    }));
  };

  const changeNameTouched = () => {
    setNameString((prev) => ({ ...prev, touched: true }));
  };

  const changePhoneTouched = () => {
    setPhoneString((prev) => ({ ...prev, touched: true }));
  };

  const { findIdMutation } = useFindId();

  const nameDisabled =
    !nameString.value ||
    !nameString.valid ||
    nameString.isError ||
    nameString.errorMessage !== "";

  const phoneDisabled =
    !phoneString.value ||
    !phoneString.valid ||
    phoneString.isError ||
    phoneString.errorMessage !== "";

  return (
    <div className={styles["find__id"]}>
      <FindInputField
        label="이름"
        htmlFor={"htmlForName"}
        type={"text"}
        value={nameString.value}
        onChange={changeNameString}
        valid={nameString.valid}
        isError={nameString.isError}
        errorMessage={nameString.errorMessage}
        touched={nameString.touched}
        onTouch={changeNameTouched}
      />
      <FindInputField
        label="전화번호"
        htmlFor={"htmlForPhone"}
        type={"text"}
        value={phoneString.value}
        onChange={changePhoneString}
        valid={phoneString.valid}
        isError={phoneString.isError}
        errorMessage={phoneString.errorMessage}
        touched={phoneString.touched}
        onTouch={changePhoneTouched}
      />
      <button
        disabled={nameDisabled || phoneDisabled}
        onClick={() =>
          findIdMutation.mutate({
            name: nameString.value,
            phoneNumber: phoneString.value,
          })
        }
      >
        다음
      </button>
    </div>
  );
};

export default FindId;
