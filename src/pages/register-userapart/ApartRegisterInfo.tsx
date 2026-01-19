import type { ApartmentDetail } from "../../hooks/useApartmentList";
import { useApartRegisterStore } from "../../stores/useApartRegisterStore";

import styles from "./ApartRegisterInfo.module.scss";
import { IoClose } from "react-icons/io5";

const ApartRegisterInfo = ({ sd }: { sd: ApartmentDetail }) => {
  const { setApartmentId } = useApartRegisterStore();

  return (
    <div className={styles["apart__register__info"]}>
      <div className={styles["apart__register__info__image"]}>
        <img
          src={sd?.fileUrl ?? "/pictures/placeholder-stock.jpg"}
          alt="thumbnail-urls"
        />
      </div>
      <div className={styles["apart__register__info__info"]}>
        <span>{sd?.kaptName}</span>
        <span>
          {sd?.kaptAddr.split(" ")[0] +
            " " +
            sd?.kaptAddr.split(" ")[1] +
            " " +
            sd?.kaptAddr.split(" ")[2]}
        </span>
        <span>아파트 {sd?.buildingCount.toLocaleString()}세대</span>
      </div>
      <button onClick={() => setApartmentId(null)}>
        <IoClose />
      </button>
    </div>
  );
};

export default ApartRegisterInfo;
