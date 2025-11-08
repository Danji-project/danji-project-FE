import ResetPasswordWrapper from "../../components/reset-password/ResetPasswordWrapper";
import Header from "../../layouts/Header";

const ResetPassword = () => {
  return (
    <>
      <Header title="비밀번호 재설정" hasBackButton />
      <ResetPasswordWrapper />
    </>
  );
};

export default ResetPassword;
