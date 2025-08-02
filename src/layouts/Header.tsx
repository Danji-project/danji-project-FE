import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import SearchBox from "../components/common/search-box/search-box";

interface HeaderProps {
  title: string;
  hasSearchBox?: boolean;
  hasBackButton?: boolean;
  hasText?: boolean;
  hasIcons?: React.ReactNode;
  hasUserIcon?: boolean;
  iconCount?: number;
  buttonText?: string;
  hasRightButton?: boolean;
  onClickButton?: () => void;
  iconComponent?: React.ReactNode;
  onIconClick?: () => void;
  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SearchHeader: React.FC<HeaderProps> = ({
  title,
  hasBackButton,
  onClickButton,
  onChangeText,
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
        {hasBackButton && (
          <button
            type="button"
            onClick={navigateBack}
            className={styles["header__back-button"]}
            style={{width:'12%'}}
          >
            <IoIosArrowBack size={20} />
          </button>
        )}
        <div style={{width:'100%'}}>
          <SearchBox content={title} placeholder="" onChange={(e)=>{if(onChangeText){onChangeText(e);}}} onSearch={()=>{onClickButton}}/>
        </div>
      </div>
    </header>
  );
};

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
  const goSettings = () => {
    navigate("/settings");
  };
  return (
    <header
      className={`${styles.header} ${styles["header--sub"]}`}
      role="banner"
    >
      <div className={styles.header__container}>
        {hasBackButton && (
          <button
            type="button"
            onClick={navigateBack}
            className={styles["header__back-button"]}
          >
            <IoIosArrowBack size={20} />
          </button>
        )}
        <h1 className={styles.header__title} id="subheader-title">
          {title}
        </h1>
        <button
          type="button"
          className={styles["header__icons"]}
          onClick={goSettings}
        >
          {hasIcons}
        </button>
      </div>
    </header>
  );
};

const Header: React.FC<HeaderProps> = (props) => {
  if(props.hasSearchBox)
    return <SearchHeader {...props}/>;

  return <TitleHeader {...props} />;
};

export default Header;
