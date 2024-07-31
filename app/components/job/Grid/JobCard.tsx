import React from 'react';
import styles from './JobCard.module.css';
import Icon from '../../general/Icon';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Job } from '@prisma/client';

interface JobCardProps {
  job: Job;
  view: string;
}

const JobCard: React.FC<JobCardProps> = ({  job, view = 'grid'  }) => {
  const JobSave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('Save job');
  }
  
  if (view === 'list') {
    return (
      <div style={{
        padding: '10px',
        border: '1px solid #ccc',
        marginBottom: '10px'
      }}>
        <h3>{job.jobTitle}</h3>
        <p>{job.companyName} - {job.location}</p>
      </div>
    );
  }

  return(
    <div className={styles.card}>
      <div>
        <img className={`${styles.companyLogo} ${styles.grayscale}`} alt="Description" src={job.logo} />
      </div>
      <p className={styles.companyName}>{job.companyName}</p>
      <p className={styles.jobTitle}>{job.jobTitle}</p>
      <p className={styles.jobLocation}>{job.location}</p>
      <p className={styles.jobType}>{job.jobType}</p>
      <p className={styles.jobSalary}>${job.salaryMin} - ${job.salaryMax}</p>
      <div className={styles.saveJob}>
        <Icon icon={faBookmark} onClick={JobSave} hoverSize={14} hoverContent='Save' width={24}/>
      </div>
    </div>
  );
}

export default JobCard;