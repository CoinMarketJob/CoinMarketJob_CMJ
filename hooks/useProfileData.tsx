"use client"
import React, { createContext, ReactNode, useState } from 'react';

interface ProfileDataContextProps {
    profileData: any;
    setProfileData: (profileData: any) => void;
    companyProfileData: any;
    setCompanyProfileData: (companyProfileData: any) => void;
}

const ProfileDataContext = createContext<ProfileDataContextProps | undefined>(undefined);

export const ProfileDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profileData, setProfileData] = useState<any>(0);
    const [companyProfileData, setCompanyProfileData] = useState<any>(0);
    
    return (
      <ProfileDataContext.Provider value={{ profileData, setProfileData, companyProfileData, setCompanyProfileData }}>
        {children}
      </ProfileDataContext.Provider>
    );
  };

  export const useProfileData = () => {
    const context = React.useContext(ProfileDataContext);
    if (!context) {
      throw new Error('useProfileData must be used within a ProfileDataProvider');
    }
    return context;
  };