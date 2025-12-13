import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginInputWrapper from "../../components/login-component/LoginInputWrapper";
import Header from "../../layouts/Header";
import { useUserInfo } from "../../stores/userStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const isLogin = useUserInfo((state) => state.isLogin);

  useEffect(() => {
    if (isLogin) {
      navigate("/", { replace: true });
    }
  }, [isLogin, navigate]);

  if (isLogin) {
    return null;
  }

  return (
    <>
      <Header title="로그인" hasBackButton />
      <LoginInputWrapper />
    </>
  );
};

export default LoginPage;
