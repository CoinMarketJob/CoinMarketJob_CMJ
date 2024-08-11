"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/general/SideBar';
import './SettingsPage.css';

import General from './General';
import Account from './Account';
import Notifications from './Notifications';
import Defaults from './Defaults';
import { Settings } from '@prisma/client';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [settingsData, setSettingsData] = useState<Settings | null>(null);


  useEffect(() => {
    async function fetchData() {
      try {
          const response = await fetch('/api/settings/get');
          const data = await response.json();
          console.log(data);
          setSettingsData(data);
      } catch (error) {
          console.error('Veri getirme hatası:', error);
      }
    }

    fetchData();
  },[])

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return <General />;
      case 'Account':
        return <Account />;
      case 'Notifications':
        return <Notifications setting={settingsData} />;
      case 'Defaults':
        return <Defaults />;
      default:
        return <General />;
    }
  };

  return (
    <div className="settings-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
