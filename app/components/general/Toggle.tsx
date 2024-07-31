"use client";

import React, { useState, ChangeEvent } from "react";
import './Toggle.css';

interface ToggleSwitchProps {
  title?: string;
  sliderName: string;
  switchState: boolean;
  setSwitchState: React.Dispatch<React.SetStateAction<boolean>>
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ title = "", sliderName, switchState, setSwitchState }) => { 
  const uniqueId = `${sliderName}-${Math.random().toString(36).substr(2, 9)}`;

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSwitchState(e.target.checked);
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
