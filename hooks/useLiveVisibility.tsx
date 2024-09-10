"use client"
import React, { createContext, ReactNode, useState, useContext } from 'react';

interface LiveVisibilityContextProps {
    isLiveVisible: boolean;
    toggleLiveVisibility: () => void;
}

const LiveVisibilityContext = createContext<LiveVisibilityContextProps | undefined>(undefined);

export const LiveVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLiveVisible, setIsLiveVisible] = useState<boolean>(true);
    
    const toggleLiveVisibility = () => {
        setIsLiveVisible(prev => !prev);
    };

    return (
      <LiveVisibilityContext.Provider value={{ isLiveVisible, toggleLiveVisibility }}>
        {children}
      </LiveVisibilityContext.Provider>
    );
};

export const useLiveVisibility = () => {
    const context = useContext(LiveVisibilityContext);
    if (!context) {
      throw new Error('useLiveVisibility must be used within a LiveVisibilityProvider');
    }
    return context;
};