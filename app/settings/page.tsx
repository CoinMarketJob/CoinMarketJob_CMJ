"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/general/SideBar';
import './SettingsPage.css';
import General from './General';
import Account from './Account';
import Notifications from './Notifications';
import Defaults from './Defaults';
import { Settings } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import Icon from "@/app/components/general/Icon";
import { useRouter } from "next/navigation";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [settingsData, setSettingsData] = useState<Settings | null>(null);
  const [page, setPage] = useState<number>(0);
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
  },[]);

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


  const ArrowIcon = () => {
    return (
      <svg
        width="16"
        height="29"
        viewBox="0 0 16 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.29487 14.4688L14.8961 27.0707C15.1398 27.3144 15.2709 27.5515 15.2894 27.7819C15.3074 28.0127 15.177 28.2704 14.8983 28.5549C14.619 28.8393 14.3718 28.9875 14.1565 28.9993C13.9418 29.0112 13.6749 28.8668 13.3558 28.5662L0.60167 15.8114C0.424835 15.5976 0.280236 15.3838 0.167877 15.17C0.0559922 14.9561 5.15829e-05 14.7177 5.15829e-05 14.4546C5.15829e-05 14.1914 0.0564681 13.952 0.169301 13.7363C0.282134 13.5211 0.42768 13.3241 0.605936 13.1454L13.3515 0.403309C13.6369 0.117909 13.8844 -0.0160195 14.094 0.00152051C14.3035 0.0185894 14.5479 0.16935 14.8271 0.453803C15.1059 0.738255 15.2453 0.986676 15.2453 1.19907C15.2453 1.41146 15.1052 1.65775 14.825 1.93793L2.29487 14.4688Z"
          fill="#242220"
          fillOpacity="0.4"
        />
      </svg>
    );
  };

  const handleBackClick = () => {
    if (page === 0) {
      // Eğer ilk sayfadaysak, ana sayfaya dön
      router.push('/');
    } else {
      // Diğer durumlarda bir önceki sayfaya git
      setPage(page - 1);
    }
  };

  return (
    <div className="settings-page">
      <div className="arrowContainer">
        <Icon
          onClick={handleBackClick}
          hoverSize={45}
          hoverContent="Back"
          tooltipPosition="bottom"
        >
          <ArrowIcon />
        </Icon>
      </div>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
