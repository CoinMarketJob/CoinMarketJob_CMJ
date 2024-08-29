"use client"
import React, { createContext, ReactNode, useState } from 'react';

interface ProfileContextProps {
    profileType: number;
    setProfileType: (profileType: number) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profileType, setProfileType] = useState<number>(0);
    
    return (
      <ProfileContext.Provider value={{ profileType, setProfileType }}>
        {children}
      </ProfileContext.Provider>
    );
  };

  export const useProfile = () => {
    const context = React.useContext(ProfileContext);
    if (!context) {
      throw new Error('useCompanyProfile must be used within a ProfileProvider');
    }
    return context;
  };