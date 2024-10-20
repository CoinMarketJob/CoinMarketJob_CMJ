"use client"
import React, { createContext, ReactNode, useState, useEffect } from 'react';

interface ProfileDataContextProps {
    profileData: any;
    setProfileData: (profileData: any) => void;
}

const ProfileDataContext = createContext<ProfileDataContextProps | undefined>(undefined);

export const ProfileDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profileData, setProfileData] = useState<any>(null);
    
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('/api/profile/get');
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <ProfileDataContext.Provider value={{ profileData, setProfileData }}>
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
