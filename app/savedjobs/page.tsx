/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import MainLayout from '../components/layouts/MainLayout';

const Page = () => {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/savedjobs/get');
        const data: { job: any }[] = await response.json();
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
        <MainLayout filteredJobs={savedJobs} layout={1} />
      </div>        
    </div>
  );
}

export default Page;
