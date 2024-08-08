/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

// Define the JobType, ExperienceLevel, EducationalDegree, and other related types
type JobType = 'Internship' | 'PartTime' | 'FullTime' | 'Contract' | 'Temporary' | 'other';
type ExperienceLevel = 'EntryLevel' | 'Junior' | 'MidLevel' | 'Senior' | 'Lead' | 'Manager' | 'Executive';
type EducationalDegree = 'HighSchool' |'Master' | 'PhD';

interface Job {
  id: number;
  userId: number;
  logo: string;
  companyName: string;
  jobTitle: string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  educationalDegree: EducationalDegree;
  salaryMin: number;
  salaryMax: number;
  packageId: number;
  visaSponsorship: boolean;
  jobDescription: string;
}

const Page = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/savedjobs/get');
        const data: { job: Job }[] = await response.json();
        console.log(data);

        // Map the data to extract jobs
        const jobArray = data.map(item => item.job);
        setSavedJobs(jobArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.Container}>
      <span className={styles.JobsText}>JOBS</span>
      <div>
        
      </div>        
    </div>
  );
}

export default Page;
