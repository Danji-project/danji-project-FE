import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

import styles from "./ComboBox.module.scss";
import { useFeedList } from "../../../hooks/useFeedList";

const ComboBox = ({
  contents,
  state,
  setState,
  isOpen,
  setIsOpen,
  apartmentId,
}: {
  contents: string[];
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  apartmentId: number;
}) => {
  const entCombo = useRef<HTMLDivElement | null>(null);

  const { feedListMutate } = useFeedList(apartmentId, state);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        entCombo.current &&
        !entCombo.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["combo__box"]} ref={entCombo}>
      {contents.map(
        (c: string) =>
          c.split("/")[1] === state && (
            <button
              className={styles["combo__box__button"]}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <span>{c.split("/")[0]}</span>
              <img src="/icons/chevron.png" alt="chevron" />
            </button>
          )
      )}
      {isOpen && (
        <div className={styles["combo__box__lists"]}>
          {contents.map((cc: string, idx: number) => (
            <button
              key={idx}
              onClick={() => {
                setState(cc.split("/")[1]);
                setIsOpen(false);
                feedListMutate();
              }}
            >
              {cc.split("/")[0]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
