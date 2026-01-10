import { useNavigate } from "react-router-dom";
import type { IconButtonProps } from "../../components/common/Icon-button/IconButton";
import { useUserInfo } from "../../stores/userStore";
import { usePendingStore } from "../../stores/usePendingStore";
import { useModalTextStore } from "../../stores/useModalText";

export const IconsMocks = (): IconButtonProps[] => {
  const navigate = useNavigate();
  const { apartmentId } = useUserInfo();
  const { setModalPending } = usePendingStore();
  const { setModalText, setIsOnlyConfirmed } = useModalTextStore();

  const showApartmentRequiredModal = () => {
    setModalText("단지를 등록후 진행할 수 있습니다.");
    setIsOnlyConfirmed(true);
    setModalPending(true);
  };

  return [
    {
      onClick: () => {
        sessionStorage.setItem("tabselect", "apart-info");
        if (apartmentId) navigate(`/apart-info/${apartmentId}`);
        else showApartmentRequiredModal();
      },
      imageUrl: "/icons/apart-info-icon.png",
      text: "단지 정보",
      className: "apart-info",
      id: "1",
    },
    {
      onClick: () => {
        sessionStorage.setItem("tabselect", "community");
        if (apartmentId) navigate(`/apart-info/${apartmentId}`);
        else showApartmentRequiredModal();
      },
      imageUrl: "/icons/Gamepad.png",
      text: "커뮤니티",
      className: "community",
      id: "2",
    },
    {
      onClick: () => {
        sessionStorage.setItem("tabselect", "notice");
        if (apartmentId) navigate(`/apart-info/${apartmentId}`);
        else showApartmentRequiredModal();
      },
      imageUrl: "/icons/notice.png",
      text: "공지사항",
      className: "notice",
      id: "3",
    },
    {
      onClick: () => {
        sessionStorage.setItem("tabselect", "building-info");
        if (apartmentId) navigate(`/apart-info/${apartmentId}`);
        else showApartmentRequiredModal();
      },
      imageUrl: "/icons/Graph.svg",
      text: "시설정보",
      className: "building-info",
      id: "4",
    },
    {
      onClick: () => {
        navigate("/my-page");
      },
      imageUrl: "/icons/User.svg",
      text: "마이페이지",
      className: "my-page",
      id: "5",
    },
    {
      onClick: () => {
        navigate("/like");
      },
      imageUrl: "/icons/Star.png",
      text: "즐겨찾기",
      className: "like",
      id: "6",
    },
    {
      onClick: () => {
        navigate("/chat-page");
      },
      imageUrl: "/icons/Message.png",
      text: "채팅",
      className: "chat",
      id: "7",
    },
    {
      onClick: () => {
        navigate("/visit/register");
      },
      imageUrl: "/icons/Receipt.png",
      text: "방문차량등록",
      className: "visit-register",
      id: "8",
    },
  ];
};
