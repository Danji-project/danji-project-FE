import { useState } from "react";
import styles from "./ComboBox.module.scss";
import { IoChevronDown } from "react-icons/io5";
import ButtonList from "./ButtonList";

export default function ComboBox({
  state,
  setState,
  list,
}: Readonly<{
  state: string;
  setState: (element: string) => void;
  list: string[];
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={styles["combo__box"]}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <span>{state}</span>
        <IoChevronDown />
      </button>
      {isOpen && (
        <ButtonList list={list} setIsOpen={setIsOpen} setState={setState} />
      )}
    </div>
  );
}
