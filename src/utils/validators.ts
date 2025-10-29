export const validators = (inputData: string, validator_case: string) => {
  if (validator_case === "EMAIL_VALID") {
    return inputData.trim().length >= 4 && inputData.trim().length <= 30;
  }
};
