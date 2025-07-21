import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
  type: "main" | "sub";
  hasBackButton?: boolean;
  hasText?: boolean;
  hasIcons?: boolean;
  hasUserIcon?: boolean;
  iconCount?: number;
  buttonText?: string;
  hasRightButton?: boolean;
  onClickButton?: () => void;
  iconComponent?: React.ReactNode;
  onIconClick?: () => void;
}

const TitleHeader: React.FC<HeaderProps> = ({
  title,
  hasBackButton,
  hasIcons,
  iconComponent,
  buttonText,
  hasRightButton,
  onClickButton,
  onIconClick,
}) => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <header
      className={`${styles.header} ${styles["header--sub"]}`}
      role="banner"
    >
      <div className={styles.header__container}>
        <nav
          className={styles.header__navigation}
          aria-label="보조 헤더 내비게이션"
        >
          {hasBackButton && (
            <button type="button" onClick={navigateBack}>
              <IoIosArrowBack size={20} />
            </button>
          )}
        </nav>
        <h1 className={styles.header__title} id="subheader-title">
          {title}
        </h1>
      </div>
    </header>
  );
};

const Header: React.FC<HeaderProps> = (props) => {
  return <TitleHeader {...props} />;
};

export default Header;
