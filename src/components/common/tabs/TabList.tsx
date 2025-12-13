import { type Dispatch, type SetStateAction } from "react";

import styles from "./TabList.module.scss";

const TabList = ({
  contents,
  tabs,
  setTabs,
}: {
  contents: string[];
  tabs: string;
  setTabs: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <ul className={styles["tab__list"]}>
      {contents.map((c: string, idx: number) => (
        <li
          key={idx}
          className={c.split("/")[1] === tabs ? styles.tab__list__active : ""}
        >
          <button
            onClick={() => {
              setTabs(c.split("/")[1]);
            }}
          >
            {c.split("/")[0]}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabList;
