"use client";

import React, { useState, ChangeEvent } from "react";
import './Toggle.css';

interface ToggleSwitchProps {
  initialChecked?: boolean;
  title?: string;
  sliderName: string;
  onChange?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialChecked = true, title = "", sliderName, onChange }) => { 
  const [switchState, setSwitchState] = useState(initialChecked);  
  const uniqueId = `${sliderName}-${Math.random().toString(36).substr(2, 9)}`;

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    setSwitchState(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  }

  return (    
    <div className="toggle-container">
      {title && <span className="toggle-title">{title}</span>}
      <label className={`toggle-switch ${switchState ? 'checked' : ''}`} htmlFor={uniqueId}> 
        <input 
          id={uniqueId}
          type="checkbox" 
          checked={switchState}
          onChange={handleOnChange} />    
        <span className={sliderName}></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
