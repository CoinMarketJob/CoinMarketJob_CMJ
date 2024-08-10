import React, { useState } from 'react';
import './General.css';
import Dropdown from '../components/general/Dropdown';

const General: React.FC = () => {
  const [dropdownValue, setDropdownValue] = useState('option1');

  const dropdownOptions = [
    { value: 'system', label: 'System' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(e.target.value);
  };

  return (
    <div className="general">
      <div className="general-header">
        <h3>Appearance</h3>
        <Dropdown 
          id="exampleDropdown"
          value={dropdownValue}
          onChange={handleDropdownChange}
          list={dropdownOptions}
          className="general-dropdown"
        />
      </div>
    </div>
  );
};

export default General;
