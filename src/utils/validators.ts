export const validateCheck = (
  validator: string,
  value: string,
  password?: string
) => {
  if (validator === "ID_CHECK") {
    return {
      valid:
        value.trim() !== "" &&
        value.length >= 4 &&
        value.length <= 25 &&
        value.includes("@"),
      error:
        value.trim() !== "" &&
        value.length >= 4 &&
        value.length <= 25 &&
        value.includes("@")
          ? ""
          : "이메일을 4~25자 이내로 입력해주세요.",
    };
  }
  if (validator === "PASSWORD_CHECK") {
    return {
      valid:
        value.trim() !== "" &&
        value.length >= 8 &&
        value.length <= 16 &&
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]:;"'<>,.?/~`|\\])/.test(
          value
        ),
      error:
        value.trim() !== "" &&
        value.length >= 8 &&
        value.length <= 16 &&
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]:;"'<>,.?/~`|\\])/.test(
          value
        )
          ? ""
          : "영문 대소문자 + 숫자 + 특수문자 8~16자로 설정해주세요.",
    };
  }

  if (validator === "PASSWORD_CONFIRM_CHECK") {
    return {
      valid:
        password?.trim() !== "" &&
        value.trim() !== "" &&
        password?.trim() === value.trim(),
      error:
        password?.trim() !== "" &&
        value.trim() !== "" &&
        password?.trim() === value.trim()
          ? ""
          : "비밀번호가 일치하지 않습니다.",
    };
  }

  if (validator === "NAME_CHECK") {
    return {
      valid: value.trim() !== "" && /^[가-힣]{2,5}$/.test(value),
      error:
        value.trim() !== "" && /^[가-힣]{2,5}$/.test(value)
          ? ""
          : "이름을 제대로 입력해주세요.",
    };
  }

  if (validator === "NICKNAME_CHECK") {
    return {
      valid: value.trim() !== "" && /^[가-힣a-zA-Z0-9]/.test(value),
      error:
        value.trim() !== "" && /^[가-힣a-zA-Z0-9]/.test(value)
          ? ""
          : "닉네임을 제대로 입력하세요.",
    };
  }

  if (validator === "PHONE_CHECK") {
    return {
      valid: value.trim().length === 11 && !value.includes("-"),
      error:
        value.trim().length === 11 && !value.includes("-")
          ? ""
          : "전화번호를 제대로 입력하세요.",
    };
  }
};
