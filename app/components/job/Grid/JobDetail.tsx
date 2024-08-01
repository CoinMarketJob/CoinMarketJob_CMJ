import { Job } from '@prisma/client';
import React from 'react';
import styles from './JobDetail.module.css';
import Icon from '../../general/Icon';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Button from '../../general/Button';
import { useRouter } from 'next/navigation';
import Draft from '../../general/Draft';
import { JSONContent } from '@tiptap/react'; // Ensure correct import

interface JobDetailProps {
  job: Job;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  const router = useRouter();

  const handleIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    // Add functionality for the share icon click
  };

  const handleButtonClick = (jobId: number) => {
    router.push('/jobapply/' + jobId);
  };

  // Ensure jobDescription is converted to a string if necessary
  const jobDescriptionString: string = typeof job.jobDescription === 'string' 
    ? job.jobDescription 
    : JSON.stringify(job.jobDescription);

  // Convert to JSONContent if applicable
  const jobDescription: JSONContent | undefined = 
    jobDescriptionString ? (JSON.parse(jobDescriptionString) as JSONContent) : undefined;

  return (
    <div className={styles.DetailArea}>
      <div className={styles.ShareIcon}>
        <Icon 
          onClick={handleIconClick} 
          width={20} 
          hoverSize={40} 
          hoverContent='Share'
        >
          <i className={`fas fa-share-nodes`} />
        </Icon>
      </div>
      <div className={styles.logoDiv}>
        <img src={job.logo} className={styles.Logo} alt="Company Logo" />  
      </div>
      <div className={styles.companyDiv}>
        <span>{job.companyName}</span>
      </div>

      <div className={styles.titleDiv}>
        <span>{job.jobTitle}</span>
      </div>

      <div className={styles.locationDiv}>
        <span>{job.location}</span>
      </div>

      <div className={styles.applyButton}>
        <Button 
          onClick={() => handleButtonClick(job.id)} 
          textColor='#FFFFFF' 
          backgroundColor='#242220' 
          text='Apply' 
          fontSize={18} 
          fontWeight={500}
          paddingLeft={48} 
          paddingRight={49}
          paddingTop={12} 
          paddingBottom={12} 
        />
      </div>

      <div className={styles.section}>
        <Draft show content={jobDescription} />
      </div>
    </div>
  );
}

export default JobDetail;
