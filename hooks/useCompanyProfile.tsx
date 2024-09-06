"use client"
import React, { createContext, ReactNode, useState, useEffect } from 'react';

interface ProfileContextProps {
    profileType: number;
    setProfileType: (profileType: number) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profileType, setProfileType] = useState<number>(0);
    
    useEffect(() => {
        const storedProfileType = localStorage.getItem('profileType');
        if (storedProfileType) {
            setProfileType(Number(storedProfileType));
        }
    }, []);

    const updateProfileType = (newProfileType: number) => {
        setProfileType(newProfileType);
        localStorage.setItem('profileType', newProfileType.toString());
    };

    return (
      <ProfileContext.Provider value={{ profileType, setProfileType: updateProfileType }}>
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