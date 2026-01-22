import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./MyApartCard.module.scss";
import { useState } from "react";
import ReactDOM from "react-dom";
import TextModal from "../common/text-modal/TextModal";
import { usePendingStore } from "../../stores/usePendingStore";

const MyApartCard = ({
  nickname,
  fileId,
  apartmentName,
  apartmentAddr,
  apartmentDong,
  apartmentHo,
  memberApartmentId,
}: {
  nickname: string;
  fileId: string;
  apartmentName: string;
  apartmentAddr: string;
  apartmentDong: string;
  apartmentHo: number;
  memberApartmentId: number;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setModalPending } = usePendingStore();

  const deleteMyApart = async () => {
    try {
      await axios.delete(`/api/member-apartments/${memberApartmentId}`, {
        withCredentials: true,
      });
      await queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles["my__apart__card"]}>
      <div className={styles["my__apart__card__top"]}>
        <h2>{nickname}님의 아지트</h2>
        <button
          type="button"
          onClick={() => navigate("/apart-register?type=edit")}
        >
          수정
        </button>
      </div>
      <div className={styles["my__apart__card__box"]}>
        <div className={styles["my__apart__card__box__image"]}>
          <img
            src={
              fileId
                ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" + fileId
                : "/pictures/placeholder-stock.jpg"
            }
            alt="apart_image"
          />
        </div>
        <div className={styles["my__apart__card__box__info"]}>
          <span>{apartmentName}</span>
          <span>{apartmentAddr}</span>
          <span>
            {apartmentDong}동 {String(apartmentHo)}호
          </span>
        </div>
      </div>
      <div className={styles["my__apart__card__buttons"]}>
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            setModalPending(true);
          }}
        >
          등록해제
        </button>
        <button type="button" onClick={() => navigate(`/apart-info/my-apart`)}>
          바로가기
        </button>
      </div>

      {isModalOpen &&
        ReactDOM.createPortal(
          <TextModal
            text="정말 삭제하시겠습니까?"
            onCancel={() => {
              setIsModalOpen(false);
              setModalPending(false);
            }}
            onSend={() => {
              deleteMyApart();
              setIsModalOpen(false);
              setModalPending(false);
            }}
            actionText="삭제"
          />,
          document.getElementById("root")!,
        )}
    </div>
  );
};

export default MyApartCard;
