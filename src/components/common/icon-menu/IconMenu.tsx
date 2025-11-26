import styles from "./IconMenu.module.scss";
import { IconsMocks } from "../../../assets/mock/iconsMocks";
import { IconButton, type IconButtonProps } from "../Icon-button/IconButton";

const IconMenu = () => {
  const iconsMocks = IconsMocks();

  return (
    <div className={styles["icon__menu"]}>
      {iconsMocks.map((icon: IconButtonProps) => (
        <IconButton
          onClick={icon.onClick}
          imageUrl={icon.imageUrl}
          text={icon.text}
          className={icon.className}
          id={icon.id}
        />
      ))}
    </div>
  );
};

export default IconMenu;
