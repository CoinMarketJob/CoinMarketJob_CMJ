import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <ul>
        <li className={activeTab === 'General' ? 'active' : ''} onClick={() => setActiveTab('General')}>General</li>
        <li className={activeTab === 'Account' ? 'active' : ''} onClick={() => setActiveTab('Account')}>Account</li>
        <li className={activeTab === 'Notifications' ? 'active' : ''} onClick={() => setActiveTab('Notifications')}>Notifications</li>
        <li className={activeTab === 'Defaults' ? 'active' : ''} onClick={() => setActiveTab('Defaults')}>Defaults</li>
      </ul>
    </div>
  );
};

export default Sidebar;
