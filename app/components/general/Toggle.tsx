"use client";

import React, { useState, ChangeEvent } from "react";
import './Toggle.css';

interface ToggleSwitchProps {
  title?: string;
  sliderName: string;
  onChange?: (checked: boolean) => void;
  switchState: boolean | undefined;
  setSwitchState: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ title = "", sliderName, onChange, switchState, setSwitchState }) => { 
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
