import { useNavigate } from "react-router-dom";
import type { IconButtonProps } from "../../components/common/icon-button/Icon-button";

export const IconsMocks = (): IconButtonProps[] => {
  const navigate = useNavigate();

  const random = Math.floor(Math.random() * 2 + 1);

  return [
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate(`/apart-info/${random}`);
      },
      imageUrl: "/icons/apart-info-icon.png",
      text: "단지 정보",
      className: "apart-info",
      id: "1",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/apart-info/community");
      },
      imageUrl: "/icons/Gamepad.png",
      text: "커뮤니티",
      className: "community",
      id: "2",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/notice");
      },
      imageUrl: "/icons/notice.png",
      text: "공지사항",
      className: "notice",
      id: "3",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/building-info");
      },
      imageUrl: "/icons/Graph.svg",
      text: "시설정보",
      className: "building-info",
      id: "4",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/my-page");
      },
      imageUrl: "/icons/User.svg",
      text: "마이페이지",
      className: "my-page",
      id: "5",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/like");
      },
      imageUrl: "/icons/Star.png",
      text: "즐겨찾기",
      className: "like",
      id: "6",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/chat");
      },
      imageUrl: "/icons/Message.png",
      text: "채팅",
      className: "chat",
      id: "7",
    },
    {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/visit/register");
      },
      imageUrl: "/icons/Receipt.png",
      text: "방문차량등록",
      className: "visit-register",
      id: "8",
    },
  ];
};
