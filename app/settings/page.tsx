"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/general/SideBar';
import './SettingsPage.css';
import styles from './page.module.css';
import Icon from '../components/general/Icon';
import { ArrowIcon } from '../components/general/Icons';
import { useRouter } from 'next/navigation';

import General from './General';
import Account from './Account';
import Notifications from './Notifications';
import Defaults from './Defaults';
import { Settings } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [settingsData, setSettingsData] = useState<Settings | null>(null);
  const router = useRouter();
  
  const searchParams = useSearchParams();

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

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.Container}>
      <div className={styles.arrowContainer}>
        <Icon
          onClick={handleBackClick}
          hoverSize={45}
          hoverContent="Back"
          tooltipPosition="bottom"
        >
          <ArrowIcon />
        </Icon>
      </div>
      <div className="settings-page">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
