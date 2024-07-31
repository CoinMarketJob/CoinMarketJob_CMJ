import React, { useState } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  initialChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ initialChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const toggleCheckbox = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div style={{display: 'flex'}}>
        <div 
        className={`${styles.checkboxIcon} ${isChecked ? styles.checked : ''}`} 
        onClick={toggleCheckbox}
        >
            <div className={styles.checkmark}>&#10003;</div>
        </div>
        <div >1 Job Posting</div>
    </div>
  );
};

export default Checkbox;