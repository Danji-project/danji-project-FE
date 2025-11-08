import { useState } from "react";
import styles from "./FindAccountWrapper.module.scss";
import FindId from "./FindId";
import { usePendingStore } from "../../stores/usePendingStore";
import TextModal from "../common/text-modal/TextModal";
import { useModalTextStore } from "../../stores/useModalText";

const FindAccountWrapper = () => {
  const tabs = ["ID/아이디", "PASS/비밀번호"];

  const [selectedTabs, setSelectedTabs] = useState("ID");

  const { modalPending } = usePendingStore();

  const { modalText } = useModalTextStore();

  return (
    <div className={styles["find__account__wrapper"]}>
      <div className={styles["find__account__wrapper__tabs"]}>
        {tabs.map((t: string, i: number) => (
          <button
            className={t.split("/")[0] === selectedTabs ? styles["on"] : ""}
            onClick={() => setSelectedTabs(t.split("/")[0])}
            key={i}
          >
            {t.split("/")[1]}
          </button>
        ))}
      </div>
      <div className={styles["find__account__wrapper__main"]}>
        {selectedTabs === "ID" && <FindId />}
      </div>
      {modalPending && <TextModal text={modalText} usingConfirm={true} />}
    </div>
  );
};

export default FindAccountWrapper;
