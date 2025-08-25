import React, { useState } from 'react';
import { type Dispatch, type SetStateAction } from "react";

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectOption(event.target.value);
    setIsOpen(true);
    updateOther ? updateOther({data : event.target.value}) : '';
  };

  const handleOptionClick = (option: string) => {
    setSelectOption(option);
    setIsOpen(false);
    updateOther ? updateOther({data : option}) : '';
  };

  return (
    <div style={{ position: 'relative', width: '80px' }}>
      <input
        type="text"
        value={selectItem}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && options.length > 0 && (
        <ul style={{ position: 'absolute', border: '1px solid #ccc', background: '#fff', listStyle: 'none', padding: 0, margin: 0 }}>
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
