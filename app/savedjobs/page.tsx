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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allJobs = await response.json();
        
        const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        
        const filteredJobs = allJobs.filter((job: any) => savedJobIds.includes(job.id));
        
        setSavedJobs(filteredJobs);
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
        {savedJobs.length > 0 ? (
          <MainLayout filteredJobs={savedJobs} layout={1} />
        ) : (
          <p>Nothing Saved.</p>
        )}
      </div>        
    </div>
  );
}

export default Page;
