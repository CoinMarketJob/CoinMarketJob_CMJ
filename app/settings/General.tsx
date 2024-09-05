import React, { useState } from "react";
import "./General.css";
import Dropdown from "../components/general/Dropdown";

const General: React.FC = () => {
  const [dropdownValue, setDropdownValue] = useState("system");

  const dropdownOptions = [
    { value: "system", label: "System" },
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <div className="general">
      <div className="general-header">
        <h3>Appearance</h3>
        <div className="general-dropdown"> 
          <Dropdown
            id="exampleDropdown"
            value={dropdownValue}
            setValue={setDropdownValue}
            list={dropdownOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default General;
