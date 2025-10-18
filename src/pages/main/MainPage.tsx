import { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import { useUserInfo } from "../../stores/userStore";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import { useNavigate } from "react-router-dom";
import MainContents from "../../components/main-contents/MainContents";
import MenuSidebar from "../../components/common/menu-sidebar/MenuSidebar";
import { useSidebarStore } from "../../stores/sidebarStore";
import IconMenu from "../../components/common/icon-menu/IconMenu";

const MainPage = () => {
  const [searchContent, setSearchContent] = useState("");
  const { isOpen, setIsOpen } = useSidebarStore();

  const { executeUserInfoMutation } = useUserInfoMutation();
  const isLogin = useUserInfo((state) => state.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      executeUserInfoMutation();
    }
  }, [isLogin]);

  return (
    <>
      {!isLogin ? (
        <Header
          title={"DANJITALK"}
          hasIcons={"Login"}
          onIconClick={() => {
            navigate("/login");
          }}
        />
      ) : (
        <Header
          title={"DANJITALK"}
          hasIcons={<img src="/icons/lists.svg" alt="list-icon" />}
          onIconClick={() => {
            setIsOpen(true);
          }}
        />
      )}
      {isOpen && <MenuSidebar />}
      {isLogin && <IconMenu />}
      <MainContents
        searchContent={searchContent}
        setSearchContent={setSearchContent}
      />
    </>
  );
};

export default MainPage;
