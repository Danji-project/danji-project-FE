import styles from "./IconMenu.module.scss";
import { IconButton, type IconButtonProps } from "../Icon-button/IconButton";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "../../../stores/userStore";

const IconMenu = () => {
  const navigate = useNavigate();
  const { data: userInfo } = useUserInfoStore();
  const apartmentId = userInfo?.apartmentId;

  const navigateToApart = (path: string = "") => {
    if (apartmentId) {
      navigate(`/apart-info/${apartmentId}${path}`);
    } else {
      navigate("/apart-setting");
    }
  };

  const iconMocks = [
    {
      id: "1",
      imageUrl: "/icons/apart-info-icon.png",
      text: "단지정보",
      className: "danji__info",
      onClick: () => navigateToApart(),
    },
    {
      id: "2",
      imageUrl: "/icons/Gamepad.png",
      text: "커뮤니티",
      className: "community__icon",
      onClick: () => navigateToApart("/community"),
    },
    {
      id: "3",
      imageUrl: "/icons/notice.png",
      text: "공지사항",
      className: "notification__icon",
      onClick: () => navigateToApart("/notification"),
    },
    {
      id: "4",
      imageUrl: "/icons/Graph.svg",
      text: "시설정보",
      className: "building__info__icon",
      onClick: () => navigateToApart("/building-info"),
    },
    {
      id: "5",
      imageUrl: "/icons/User.svg",
      text: "마이페이지",
      className: "my__page__icon",
      onClick: () => navigate("/my-page"),
    },
    {
      id: "6",
      imageUrl: "/icons/Star.png",
      text: "즐겨찾기",
      className: "bookmark__icon",
      onClick: () => navigate("/bookmark"),
    },
    {
      id: "7",
      imageUrl: "/icons/Message.png",
      text: "채팅",
      className: "chatting__icon",
      onClick: () => navigate("/chatting"),
    },
    {
      id: "8",
      imageUrl: "/icons/Receipt.png",
      text: "방문차량등록",
      className: "car__register__icon",
      onClick: () => navigate("/car-register"),
    },
  ];

  return (
    <div className={styles["icon__menu"]}>
      {iconMocks.map((icon: IconButtonProps) => (
        <IconButton
          key={icon.id}
          onClick={icon.onClick}
          imageUrl={icon.imageUrl}
          text={icon.text}
          className={icon.className}
          id={icon.id}
        />
      ))}
    </div>
  );
};

export default IconMenu;
