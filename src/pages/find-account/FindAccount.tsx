import FindAccountWrapper from "../../components/find-account/FindAccountWrapper";
import Header from "../../layouts/Header";

const FindAccount = () => {
  return (
    <>
      <Header title="아이디/비밀번호 찾기" hasBackButton />
      <FindAccountWrapper />
    </>
  );
};

export default FindAccount;
