"use client"
import { Job } from '@prisma/client'
import React, { useState } from 'react'
import JobCard from '../job/Basic/JobCard'
import JobDetails from '../job/JobDetails'
import styles from './Basic.module.css'

interface BasicProps {
    jobs: Array<Job>
}
const Basic:React.FC<BasicProps> = ({jobs}) => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleJobClick = (job: Job) => {
      setSelectedJob(job);
    };
  
    const handleCloseJobDetails = () => {
      setSelectedJob(null);
    };

  return (
    <div style={{width: '100%'}}>
        <div className={styles.container}>
            <div className={`${styles.jobList} ${selectedJob ? styles.collapsed : ''}`}>
                {jobs.map(job => (
                        <JobCard key={job.id} job={job} onClick={() => handleJobClick(job)} collapsed={!!selectedJob} />
                    ))}
            </div>
            <div className={`${styles.jobDetails} ${selectedJob ? '' : styles.hidden}`}>
              {selectedJob && <JobDetails job={selectedJob} onClose={handleCloseJobDetails} />}
            </div>
        </div>
  </div>
  )
}

export default Basic