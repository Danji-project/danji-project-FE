import LoginInputWrapper from "../../components/login-component/LoginInputWrapper";
import Header from "../../layouts/Header";

const LoginPage = () => {
  return (
    <>
      <Header title="로그인" hasBackButton />
      <LoginInputWrapper />
    </>
  );
};

export default LoginPage;
