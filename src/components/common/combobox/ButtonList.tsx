import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import styles from "./ButtonList.module.scss";

const ButtonList = ({
  list,
  setIsOpen,
  setState,
}: {
  list: string[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setState: (element: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div ref={ref} className={styles["button__list"]}>
      {list.map((element: string) => (
        <button
          type="button"
          key={element}
          onClick={(e) => {
            e.stopPropagation();
            setState(element);
            setIsOpen(false);
          }}
        >
          {element.split("/")[0]}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
