import { useNavigate } from "react-router-dom";
import type { Apartments } from "../../stores/useSearchTermStore";

import styles from "./ApartCard.module.scss";
import { useApartRegisterStore } from "../../stores/useApartRegisterStore";

const ApartCard = ({
  sd,
  isSelected,
  onSelect,
}: {
  sd: Apartments;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const navigate = useNavigate();
  const { setApartmentId } = useApartRegisterStore();
  const isDisabled = sd.id === null;

  return (
    <button
      className={`${styles["card__button"]} ${isDisabled ? styles["card__button--disabled"] : ""}`}
      disabled={isDisabled}
      onClick={() => {
        if (isDisabled) return;
        onSelect();
        if (isSelected) {
          setApartmentId(sd.id);
          navigate("/apart-register");
        }
      }}
    >
      <div className={styles["card__button__image__wrapper"]}>
        <img
          src={sd.thumbnailFileUrl ?? "/pictures/placeholder-stock.jpg"}
          alt="thumbnail-url"
        />
      </div>
      <div className={styles["card__button__info"]}>
        <span>{sd.name}</span>
        <span>{sd.region}</span>
        <span>
          아파트 {sd.totalUnit}세대 |{" "}
          {sd.buildingCount ? "총" + sd.buildingCount + "동" : "동 없음"}
        </span>
      </div>
      {isSelected ? (
        <div className={styles["card__button__checked"]}></div>
      ) : (
        <div className={styles["card__button__not__checked"]}></div>
      )}
    </button>
  );
};

export default ApartCard;
