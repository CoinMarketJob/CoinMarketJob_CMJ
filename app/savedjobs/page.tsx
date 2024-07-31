/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import JobCard from '../components/job/Basic/JobCard';
import Basic from '../components/layouts/Basic';

const page = () => {
   const [savedJobs, setSavedJobs] = useState<Array<any>>([]); 


   useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch('/api/savedjobs/get');
            const data = await response.json();
            console.log(data);
            const jobArray = data.map(item => item.job);
            setSavedJobs(jobArray);
        } catch (error) {
            console.error('Veri getirme hatası:', error);
        }
      }
  
      fetchData();
   },[]);

  return (
    <div className={styles.Container}>
        <span className={styles.JobsText}>JOBS</span>
        <div>
            <Basic jobs={savedJobs} />
        </div>        
    </div>
  )
}

export default page
