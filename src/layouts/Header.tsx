import styles from "./Header.module.scss";

import { IoIosArrowBack } from "react-icons/io";

const Header = ({ title }: { title: string }) => {
  return (
    <header role="banner" className={styles.backHeader}>
      <div className={styles.backInner}>
        <button type="button">
          <IoIosArrowBack size={20} />
        </button>
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default Header;
