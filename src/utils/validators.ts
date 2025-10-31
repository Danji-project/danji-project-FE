export const validators = (
  inputData: string,
  validator_case: string,
  passwordData?: string
) => {
  if (validator_case === "EMAIL_VALID") {
    return inputData.trim().length >= 4 && inputData.trim().length <= 30;
  }
  if (validator_case === "VALIDATION_CODE_VALID") {
    return inputData.trim().length === 6;
  }
  if (validator_case === "PASSWORD_VALID") {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).+$/;
    return (
      inputData.trim().length >= 8 &&
      inputData.trim().length <= 16 &&
      passwordRegex.test(inputData)
    );
  }
  if (validator_case === "PASSWORD_CONFIRM_VALID") {
    return inputData.trim() === passwordData?.trim();
  }
  if (validator_case === "NAME_VALID" || validator_case === "NICKNAME_VALID") {
    return inputData !== "" && inputData.trim().length <= 4;
  }
  if (validator_case === "PHONE_VALID") {
    return inputData.trim().length === 11 && !inputData.includes("-");
  }
};
