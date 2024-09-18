/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import MainLayout from '../components/layouts/MainLayout';
import { useRouter } from "next/navigation"
import Icon from '../components/general/Icon';

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

  const ArrowIcon = () => {
    return (
      <svg
        width="16"
        height="29"
        viewBox="0 0 16 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.29487 14.4688L14.8961 27.0707C15.1398 27.3144 15.2709 27.5515 15.2894 27.7819C15.3074 28.0127 15.177 28.2704 14.8983 28.5549C14.619 28.8393 14.3718 28.9875 14.1565 28.9993C13.9418 29.0112 13.6749 28.8668 13.3558 28.5662L0.60167 15.8114C0.424835 15.5976 0.280236 15.3838 0.167877 15.17C0.0559922 14.9561 5.15829e-05 14.7177 5.15829e-05 14.4546C5.15829e-05 14.1914 0.0564681 13.952 0.169301 13.7363C0.282134 13.5211 0.42768 13.3241 0.605936 13.1454L13.3515 0.403309C13.6369 0.117909 13.8844 -0.0160195 14.094 0.00152051C14.3035 0.0185894 14.5479 0.16935 14.8271 0.453803C15.1059 0.738255 15.2453 0.986676 15.2453 1.19907C15.2453 1.41146 15.1052 1.65775 14.825 1.93793L2.29487 14.4688Z"
          fill="#242220"
          fillOpacity="0.4"
        />
      </svg>
    );
  };
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.Container}>
    <div className={styles.Header}>
      <div className={styles.arrowContainer}>
        <Icon
          onClick={handleBackClick}
          hoverSize={45}
          hoverContent="Back"
          tooltipPosition="bottom"
        >
          <ArrowIcon />
        </Icon>
      </div>
      <div className={styles.JobsText}>JOBS</div>
    </div>
    <div className={styles.Line}></div>
      
    <div className={styles.savedJobsContainer}>
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
