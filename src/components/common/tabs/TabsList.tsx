import type { Dispatch, SetStateAction } from "react";
import styles from "./TabsList.module.scss";

const TabsList = ({
  content,
  tabs,
  setTabs,
}: {
  content: string[];
  tabs: string;
  setTabs: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className={styles.tabsList}>
      {content.map((c: string, i: number) => (
        <div
          className={styles.tabs}
          style={{ width: `${100 / content.length}%` }}
          key={i}
        >
          <button
            className={`${styles.tabsButton} ${
              tabs === c.split("/")[1] ? styles.tabsActive : ""
            }`}
            onClick={() => {
              setTabs(c.split("/")[1]);
            }}
          >
            {c.split("/")[0]}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabsList;
