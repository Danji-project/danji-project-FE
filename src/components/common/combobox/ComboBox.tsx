import React, { useState } from 'react';
import { type Dispatch, type SetStateAction } from "react";
import styles from './ComboBox.module.scss';

interface ComboBoxProps {
  options: string[];
  placeholder?: string;
  selectItem : string;
  setSelectOption: Dispatch<SetStateAction<string>>;
  updateSelectOption?: Dispatch<SetStateAction<string>>;
  updateOther ? : ({data}:{data:string}) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, selectItem, setSelectOption, updateOther, placeholder , updateSelectOption}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectOption(option);
    setIsOpen(false);
    updateOther ? updateOther({data : option}) : '';
  };

  return (
    <div onClick={() => setIsOpen(!isOpen)} onBlur={() => setIsOpen(false)}
         style={{  width: '80px', position: 'relative'}}>
      <div  className={`${styles.ComboBoxContainer}`}>
        <button className={`${styles.buttonContainer}`}
        >{selectItem}</button>
        <div>^</div>
      </div>
      {isOpen && options.length > 0 && (
        <ul className={`${styles.ComboBoxSelectOptions}`}>
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              style={{ padding: '8px', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default ComboBox;
