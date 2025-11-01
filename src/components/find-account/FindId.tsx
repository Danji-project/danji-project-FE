import { useState } from "react";
import FindInputField from "../common/find-input-field/FindInputField";
import styles from "./FindId.module.scss";
import { useFindId } from "../../hooks/useFindAccount";
import { usePendingStore } from "../../stores/usePendingStore";
import { useModalTextStore } from "../../stores/useModalText";

const FindId = () => {
  const [nameData, setNameData] = useState({
    value: "",
    valid: false,
    isError: false,
    touched: false,
    errorMessage: "",
  });

  const [phoneData, setPhoneData] = useState({
    value: "",
    valid: false,
    isError: false,
    touched: false,
    errorMessage: "",
  });

  const changeNameData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameData((prev) => ({
      ...prev,
      value: e.target.value,
      valid: e.target.value.trim() !== "",
      isError: e.target.value.trim() === "",
      errorMessage:
        e.target.value.trim() === "" ? "이름을 제대로 입력하세요" : "",
    }));
  };

  const changePhoneData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneData((prev) => ({
      ...prev,
      value: e.target.value,
      valid:
        e.target.value.trim() !== "" &&
        e.target.value.trim().length === 11 &&
        !e.target.value.trim().includes("-"),
      isError: !(
        e.target.value.trim() !== "" &&
        e.target.value.trim().length === 11 &&
        !e.target.value.trim().includes("-")
      ),
      errorMessage: !(
        e.target.value.trim() !== "" &&
        e.target.value.trim().length === 11 &&
        !e.target.value.trim().includes("-")
      )
        ? "전화번호를 제대로 입력해주세요"
        : "",
    }));
  };

  const touchedNameData = () => {
    setNameData((prev) => ({ ...prev, touched: true }));
  };

  const touchPhoneData = () => {
    setPhoneData((prev) => ({ ...prev, touched: true }));
  };

  const nameDisabled = !nameData.valid || nameData.isError;

  const phoneDisabled = !phoneData.valid || phoneData.isError;

  const { findIdMutation, findIdPending } = useFindId();

  const { setFindPending } = usePendingStore();

  const formSubmit = async () => {
    findIdMutation.mutate({
      name: nameData.value,
      phoneNumber: phoneData.value,
    });
    setFindPending(findIdPending);
  };

  return (
    <>
      <FindInputField
        label="이름"
        type={"text"}
        htmlFor={"nameFor"}
        className={"name"}
        placeholder={"이름을 입력해주세요"}
        value={nameData.value}
        onChangeEvent={changeNameData}
        valid={nameData.valid}
        isError={nameData.isError}
        touched={nameData.touched}
        errorMessage={nameData.errorMessage}
        onTouch={touchedNameData}
      />
      <FindInputField
        label="전화번호"
        type={"text"}
        className={"phone"}
        htmlFor={"phoneFor"}
        placeholder="-제외 11자리를 입력해주세요."
        value={phoneData.value}
        onChangeEvent={changePhoneData}
        valid={phoneData.valid}
        isError={phoneData.isError}
        touched={phoneData.touched}
        errorMessage={phoneData.errorMessage}
        onTouch={touchPhoneData}
      />
      <button
        className={styles["find__id__button"]}
        disabled={nameDisabled || phoneDisabled}
        type="submit"
        onClick={formSubmit}
      >
        다음
      </button>
    </>
  );
};

export default FindId;
