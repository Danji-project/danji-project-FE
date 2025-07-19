export const validateCheck = (validator: string, value: string) => {
  if (validator === "ID_CHECK") {
    return {
      valid:
        value.trim() !== "" &&
        value.length >= 4 &&
        value.length <= 15 &&
        value.includes("@"),
      error:
        value.trim() !== "" &&
        value.length >= 4 &&
        value.length <= 15 &&
        value.includes("@")
          ? ""
          : "이메일을 4~15자 이내로 입력해주세요.",
    };
  }
  if (validator === "PASSWORD_CHECK") {
    return {
      valid:
        value.trim() !== "" &&
        value.length >= 8 &&
        value.length <= 16 &&
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]:;"'<>,.?/~`|\\])/.test(
          value.trim()
        ),
      error:
        value.trim() !== "" &&
        value.length >= 8 &&
        value.length <= 16 &&
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]:;"'<>,.?/~`|\\])/.test(
          value.trim()
        )
          ? ""
          : "영문 대소문자 + 숫자 + 특수문자 8~16자로 설정해주세요.",
    };
  }
};
