import { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { useUserInfo } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import MainContents from "../../components/main-contents/MainContents";
import MenuSidebar from "../../components/common/menu-sidebar/MenuSidebar";
import { useSidebarStore } from "../../stores/sidebarStore";
import IconMenu from "../../components/common/icon-menu/IconMenu";

const MainPage = () => {
  const [searchContent, setSearchContent] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, setIsOpen } = useSidebarStore();

  const isLogin = useUserInfo((state) => state.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('tabselect','apart-info');
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <>
      {isLogin ? (
        <Header
          title={"DANJITALK"}
          hasIcons={<img src="/icons/lists.svg" alt="list-icon" />}
          onIconClick={() => {
            setIsOpen(true);
          }}
        />
      ) : (
        <Header
          title={"DANJITALK"}
          hasIcons={"Login"}
          onIconClick={() => {
            navigate("/login");
          }}
        />
      )}
      {isLogin && <MenuSidebar />}
      {isLogin && <IconMenu />}
      <MainContents
        searchContent={searchContent}
        setSearchContent={setSearchContent}
      />
    </>
  );
};

export default MainPage;
