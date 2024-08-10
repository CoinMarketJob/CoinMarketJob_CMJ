import React, { useState } from 'react';
import './Notifications.css';
import ToggleSwitch from '../components/general/Toggle';
import SingleSlider from '../components/general/SingleSlider';

const Notifications: React.FC = () => {
  const [sublabel, setSublabel] = useState('Almost Nothing');

  const handleValueChange = (value: number) => {
    console.log(`Value: ${value}`);
    // Update sublabel based on the slider value
    let newSublabel = '';
    switch (value) {
      case 0:
        newSublabel = 'Almost Nothing';
        break;
      case 25:
        newSublabel = 'Monthly Summary';
        break;
      case 50:
        newSublabel = 'Weekly Summary';
        break;
      case 75:
        newSublabel = 'Daily Summary';
        break;
      case 100:
        newSublabel = 'Pretty Much Everything';
        break;
      default:
        newSublabel = '';
    }
    setSublabel(newSublabel);
  };

  return (
    <div className="notifications">
      <h4>Email notifications</h4>
      <hr className="notification-divider" />
      <div className="notification-item">
        <span>Job alerts</span>
        <ToggleSwitch sliderName="slider1" />
      </div>
      <div className="notification-item">
        <span>Things you should know</span>
        <ToggleSwitch sliderName="slider2" />
      </div>
      <div className="notification-item">
        <span>Updates about CoinMarketJob</span>
        <ToggleSwitch sliderName="slider3" />
      </div>
      <div className='slider'>
      <SingleSlider 
        min={0} 
        max={100} 
        step={25} 
        onValueChange={handleValueChange} 
        sublabel={sublabel} 
      />
      </div>
      <div className='sub-label'>
      <span>{sublabel}</span>
      </div>
    </div>
  );
};

export default Notifications;
