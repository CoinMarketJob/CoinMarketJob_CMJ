"use client"
import { Job } from '@prisma/client';
import React, { createContext, ReactNode, useState } from 'react';

interface JobsContextProps {
    jobs: Array<Job>;
    setJobs: (jobs: Array<Job>) => void;
    filteredJobs: Array<Job>;
    setFilteredJobs: (jobs: Array<Job>) => void;
}


const JobsContext = createContext<JobsContextProps | undefined>(undefined);

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<Array<Job>>([]);
    const [filteredJobs, setFilteredJobs] = useState<Array<Job>>([]);
    
    return (
      <JobsContext.Provider value={{ jobs, setJobs, filteredJobs, setFilteredJobs }}>
        {children}
      </JobsContext.Provider>
    );
  };

export const useJobs = () => {
    const context = React.useContext(JobsContext);
    if (!context) {
      throw new Error('useJobs must be used within a JobsProvider');
    }
    return context;
  };