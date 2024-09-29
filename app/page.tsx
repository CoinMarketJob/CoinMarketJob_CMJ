"use client";
import React, {useState,useEffect} from 'react'
import styles from './page.module.css';
import { useJobs } from '@/hooks/useJobs';
import { useLayout } from '@/hooks/useLayout';
import MainLayout from './components/layouts/MainLayout';
import JobCardSkeleton from './components/general/JobCardSkeleton';

const Home = () => {
  const { jobs, setJobs, filteredJobs, setFilteredJobs } = useJobs();
  const { layout } = useLayout();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('/api/job/get');
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error('Veri getirme hatası:', error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, [setJobs, setFilteredJobs]);
  
  return (
    <div style={{width: '100%'}}>
      {loading ? (
        <div className={styles.skeletonContainer}>
          {[...Array(6)].map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <MainLayout filteredJobs={filteredJobs} layout={layout} />
      )}
    </div>
  )
}

export default Home