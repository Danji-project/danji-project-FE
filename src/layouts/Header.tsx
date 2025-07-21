import styles from "./Header.module.scss";

import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <header role="banner" className={styles.backHeader}>
      <div className={styles.backInner}>
        <button type="button" onClick={navigateBack}>
          <IoIosArrowBack size={20} />
        </button>
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default Header;
