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
};
