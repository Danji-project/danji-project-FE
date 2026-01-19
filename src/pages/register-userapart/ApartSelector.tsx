import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import styles from "./ApartSelector.module.scss";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ApartSelector = ({
  array,
  selected,
  setSelected,
  open,
  setOpen,
}: {
  array: number[];
  selected: number;
  setSelected: (selected: number) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [moveIndex, setMoveIndex] = useState<number>(0);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <div className={styles["apart__selector"]}>
      <button onClick={() => setOpen(true)} type="button">
        <span>{selected}</span>
        <FiChevronDown />
      </button>
      {open && (
        <div className={styles["apart__real__selector"]} ref={selectorRef}>
          <button
            onClick={() => {
              if (moveIndex === 0) return;
              setMoveIndex((prev) => prev - 1);
            }}
            disabled={moveIndex === 0}
            type="button"
          >
            <FiChevronUp />
          </button>
          {array.slice(moveIndex, moveIndex + 7).map((num: number) => (
            <button
              key={num}
              onClick={() => {
                setSelected(num);
                setOpen(false);
              }}
              type="button"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => {
              if (moveIndex + 7 >= array.length) return;
              setMoveIndex((prev) => prev + 1);
            }}
            type="button"
            disabled={moveIndex + 7 >= array.length}
          >
            <FiChevronDown />
          </button>
        </div>
      )}
    </div>
  );
};

export default ApartSelector;
