import React from 'react';
import './Defaults.css';
import ToggleSwitch from '../components/general/Toggle';

const Defaults: React.FC = () => {
  return (
    <div className="defaults">
      <div className="defaults-item">
        <h4>Email notifications</h4>
      </div>
     {/*  <div className="defaults-item">
        <h4>Job alerts</h4>
        <ToggleSwitch sliderName="slider1" />
      </div> */}
    </div>
  );
};

export default Defaults;
