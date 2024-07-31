"use client"
import React, { createContext, ReactNode, useState } from 'react';

interface LayoutContextProps {
    layout: number;
    setLayout: (layout: number) => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [layout, setLayout] = useState<number>(1);
    
    return (
      <LayoutContext.Provider value={{ layout, setLayout }}>
        {children}
      </LayoutContext.Provider>
    );
  };

  export const useLayout = () => {
    const context = React.useContext(LayoutContext);
    if (!context) {
      throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
  };