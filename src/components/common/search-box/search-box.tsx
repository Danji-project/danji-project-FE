import SearchIcon from "../../../assets/button/Search.svg";

import styles from "./search-box.module.scss";

const SearchBox = ({
  content,
  placeholder,
  onChange,
  onSearch,
}: {
  content: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}) => {
  return (
    <div className={`${styles["search-box-outline"]}`}>
      <input
        className={`${styles["search-box-input"]}`}
        value={content}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key == "Enter") onSearch();
        }}
      />
      <button
        className={`${styles["search-box-button"]}`}
        onClick={() => {
          onSearch();
        }}
      >
        <img src={SearchIcon} alt="search_icon" />
      </button>
    </div>
  );
};

export default SearchBox;
