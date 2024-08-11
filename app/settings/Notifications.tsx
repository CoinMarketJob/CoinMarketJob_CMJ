"use client";
import React, { useEffect, useState } from 'react';
import './Notifications.css';
import ToggleSwitch from '../components/general/Toggle';
import SingleSlider from '../components/general/SingleSlider';
import { Settings } from '@prisma/client';
import { formatFrequency, formatValueToFrequency } from '@/utils/formatter';
import Button from '../components/general/Button';


interface NotificationsProps {
  setting: Settings | null | undefined;
}

const Notifications: React.FC<NotificationsProps> = ({ setting }) => {
  const [sublabel, setSublabel] = useState('Almost Nothing');
  const [jobAlerts, setJobAlerts] = useState<boolean | undefined>(undefined);
  const [shouldKnow, setShouldKnow] = useState<boolean | undefined>(undefined);
  const [updates, setUpdates] = useState<boolean | undefined>(undefined);
  const [alertFrequency, setAlertFrequency] = useState<number>(0);

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

  useEffect(() => {
    setJobAlerts(!setting?.jobAlert)
    setShouldKnow(!setting?.shouldKnow)
    setUpdates(!setting?.updates)
    setAlertFrequency(formatFrequency(setting?.frequency))
    handleValueChange(formatFrequency(setting?.frequency))
  }, [setting])

  const Save = async () => {
    try {
      const data = {
        jobAlerts,
        shouldKnow,
        updates,
        frequency: formatValueToFrequency(alertFrequency)
      };

      const response = await fetch("/api/settings/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        
      } else {
        console.error("Error Posting for job:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="notifications">
      <h4>Email notifications</h4>
      <hr className="notification-divider" />
      <div className="notification-item">
        <span>Job alerts</span>
        <ToggleSwitch switchState={jobAlerts} setSwitchState={setJobAlerts} sliderName="slider1" />
      </div>
      <div className="notification-item">
        <span>Things you should know</span>
        <ToggleSwitch switchState={shouldKnow} setSwitchState={setShouldKnow} sliderName="slider2" />
      </div>
      <div className="notification-item">
        <span>Updates about CoinMarketJob</span>
        <ToggleSwitch switchState={updates} setSwitchState={setUpdates} sliderName="slider3" />
      </div>
      <SingleSlider 
        min={0} 
        max={100} 
        step={25} 
        onValueChange={handleValueChange} 
        sublabel={sublabel} 
        value={alertFrequency}
        setValue={setAlertFrequency}
      />
      <div className='sub-label'>
        <span>{sublabel}</span>
      </div>

      <div className='save-button-div'>
        <Button text="Save" onClick={Save} paddingTop={12} paddingBottom={12} paddingLeft={24} paddingRight={24} />
      </div>
    </div>
  );
};

export default Notifications;
