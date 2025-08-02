import { useId, useState } from 'react';
import { BaseApartInfo } from "../../model/BaseApartInfoModel";
import styles from './apart-card.module.scss'
import LocationIcon from '../../assets/Icon/LocationIcon.png';
import type { ChangeEvent, KeyboardEvent } from 'react';

interface ApartProps{
  id?: string;
  onBookMarked: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickCard : (e: React.MouseEvent<HTMLDivElement>) => void;
  element : BaseApartInfo;
}

interface ToggleBtnProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
}


const ToggleBtn = ({
  checked,
  onChange,
  id,
}: ToggleBtnProps) => {

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const inputElement = document.getElementById(
        checkboxId
      ) as HTMLInputElement;
      if (inputElement) {
        const event = new MouseEvent('change', { bubbles: true });
        Object.defineProperty(event, 'target', {
          value: inputElement,
          enumerable: true,
        });
        onChange(event as unknown as ChangeEvent<HTMLInputElement>);
      }
    }
  };

  // 여러개의 element를 하나의 component로 연결
  const generateId = useId();
  const checkboxId = id || `checkbox-${generateId}`;

  return (
    <div
      className={`${styles.checkbox}`}
      role="checkbox"
      aria-checked={checked}
      onKeyDown={handleKeyDown}
    >
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        className={styles.input}
        aria-labelledby={`${checkboxId}-label`}
        onFocus={(e) => e.stopPropagation()}
      />
      <label
        id={`${checkboxId}-label`}
        htmlFor={checkboxId}
        className={styles.label}
      >
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};


const ApartCard: React.FC<ApartProps> = ({ element , onBookMarked, onClickCard}) => {
  const [bookmark, setBookmark] = useState(element.bookmark);

  const onBookmark = () => {
    setBookmark(!bookmark);
    const inputElement = document.getElementById(generateId) as HTMLInputElement;
    if (inputElement) {
      const event = new MouseEvent('change', { bubbles: true });
      Object.defineProperty(event, 'target', {
        value: inputElement,
        enumerable: true,
      });
      onBookMarked(event as unknown as ChangeEvent<HTMLInputElement>);
    }
    //console.log(bookmark);
  }
  
  const generateId = useId();

  return (
    <div style={{width:'150px', marginBottom:'8px', marginTop:'8px'}} onClick={onClickCard}>
      <div style={{position:'relative', borderRadius:'8px'}}>
        <img style={{width:'150px', height:'180px', borderRadius:'8px'}} src={element.picture}/>
        <div className={`${styles['div-overray']}`}>
          {
            element.isuseBookmark
            ?
            <ToggleBtn id={generateId} checked={bookmark} onChange={onBookmark}/>
            :
            <></>
          }
          <div className={`${styles["div-div-overray"]}`}>
            <img src={LocationIcon}/>
            <p>{element.locatin}</p>
          </div>
        </div>
      </div>
      <div style={{cursor:'pointer'}}>
        <p style={{fontSize:'14px', fontWeight:'600', color:'rgba(151, 187, 255, 1)'}}>{element.apartName}</p>
        <p style={{fontSize:'14px', color:'rgba(17, 17, 17, 1)'}}>{element.apartDetailName}</p>
        <div className={`${styles["div-detail-info"]}`}>
          <p>총{element.totalHouseHolds}세대</p>
          <p>|</p>
          <p>{element.houseSize}평</p>
          <p>|</p>
          <p>{element.moveVailableMonth}월 입주</p>
        </div>
      </div>
    </div>
  );
};

export default ApartCard;