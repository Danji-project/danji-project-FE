import { useEffect } from "react";
import MyPageBox from "../../components/my-page-box/MyPageBox";
import Header from "../../layouts/Header";
import styles from "./MyPage.module.scss";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("selectApart");
  }, []);

  return (
    <div className={styles["mypage__wrapper"]}>
      <Header
        title="마이페이지"
        hasBackButton
        hasIcons={<IoMdSettings size={20} />}
        onIconClick={() => navigate("/settings")}
      />
      <MyPageBox />
    </div>
  );
};

export default MyPage;
