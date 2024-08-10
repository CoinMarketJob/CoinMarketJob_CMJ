"use client";
import React, { useState } from 'react';
import Sidebar from '../components/general/SideBar';
import './SettingsPage.css';

import General from './General';
import Account from './Account';
import Notifications from './Notifications';
import Defaults from './Defaults';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return <General />;
      case 'Account':
        return <Account />;
      case 'Notifications':
        return <Notifications />;
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
