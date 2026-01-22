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
      {contents.map((c: string, idx: number) => {
        const tabValue = c.split("/")[1];
        const isActive = tabValue === tabs;

        return (
          <li key={idx} className={isActive ? styles.tab__list__active : ""}>
            <button
              onClick={() => {
                setTabs(tabValue);
              }}
            >
              {tabValue}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TabList;
