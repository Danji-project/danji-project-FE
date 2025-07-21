import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import back_icon from "../../assets/button/prevBtn.svg";

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

const SubHeader: React.FC<HeaderProps> = ({
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
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles["header__back-button"]}
              aria-label="이전 페이지로 이동"
            >
              <img src={back_icon} alt="" aria-hidden="true" />
            </button>
          )}
        </nav>
        <h1 className={styles.header__title} id="subheader-title">
          {title}
        </h1>
        {hasRightButton && (
          <button onClick={onClickButton} className={styles.header__button}>
            <span className={styles.header__button_text}>{buttonText}</span>
          </button>
        )}
        {hasIcons && iconComponent && (
          <button
            type="button"
            className={styles.header__icon}
            aria-label="설정"
            onClick={onIconClick}
          >
            {iconComponent}
          </button>
        )}
      </div>
    </header>
  );
};

const MainHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <header
        className={`${styles.header} ${styles["header--main"]}`}
        role="banner"
      >
        <div className={styles.header__container}>
          <h1 className={styles.header__title} id="mainheader-title">
            <Link to="/" className={styles.header__title_link}>
              {title}
            </Link>
          </h1>
        </div>
      </header>
    </>
  );
};

const Header: React.FC<HeaderProps> = (props) => {
  return props.type === "main" ? (
    <MainHeader {...props} />
  ) : (
    <SubHeader {...props} />
  );
};

export default Header;
