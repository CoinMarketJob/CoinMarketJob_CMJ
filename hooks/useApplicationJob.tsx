"use client";
import { Job } from '@prisma/client';
import React, { createContext, ReactNode, useState } from 'react';

interface JobApplicationsContextProps {
    jobApplications: any;
    setJobApplications: (jobs: any) => void;
}


const JobApplicationsContext = createContext<JobApplicationsContextProps | undefined>(undefined);

export const JobApplicationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobApplications, setJobApplications] = useState<any>([]);
    
    return (
      <JobApplicationsContext.Provider value={{ jobApplications, setJobApplications }}>
        {children}
      </JobApplicationsContext.Provider>
    );
  };

export const useJobApplications = () => {
    const context = React.useContext(JobApplicationsContext);
    if (!context) {
      throw new Error('useJobApplications must be used within a JobApplicationsProvider');
    }
    return context;
  };
