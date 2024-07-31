"use client"
import React, { createContext, ReactNode, useState } from 'react';

interface City {
    cityName: string;
    lat: number;
    lng: number;
}

interface CityContextProps {
    cities: Array<City>;
    setCities: (cities: Array<City>) => void;
}


const CitiesContext = createContext<CityContextProps | undefined>(undefined);

export const CitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cities, setCities] = useState<Array<City>>([]);
    
    return (
      <CitiesContext.Provider value={{ cities, setCities }}>
        {children}
      </CitiesContext.Provider>
    );
};

export const useCities = () => {
    const context = React.useContext(CitiesContext);
    if (!context) {
      throw new Error('useCities must be used within a CitiesProvider');
    }
    return context;
  };