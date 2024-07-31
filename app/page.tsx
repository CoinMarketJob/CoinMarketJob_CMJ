/* eslint-disable */
"use client";
import React, {useState,useEffect} from 'react'
import styles from './page.module.css';
import Basic from './components/layouts/Basic';
import { useJobs } from '@/hooks/useJobs';
import JobBoard from './components/job/Grid/JobBoard';
import Cozy from './components/layouts/Cozy';
import Compact from './components/layouts/Compact';
import { useLayout } from '@/hooks/useLayout';

const Home = () => {
  const { jobs, setJobs, filteredJobs, setFilteredJobs } = useJobs();
  const { layout } = useLayout();

  useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetchData() {
      try {
          const response = await fetch('/api/job/get');
          const data = await response.json();
          console.log(data);
          setJobs(data);
          setFilteredJobs(data);
          console.log(layout);
      } catch (error) {
          console.error('Veri getirme hatası:', error);
      }
    }

    fetchData();
  },[])

  return (
    <div style={{width: '100%'}}>
      {layout == 1 ? (
        <Basic jobs={filteredJobs} />
      ) : layout == 2 ? (
        <JobBoard />
      ) : layout == 3 ? (
        <Cozy jobs={filteredJobs} />) : (<Compact jobs={filteredJobs}  />)}
    </div>
  )
}

export default Home