import React from 'react';
import styles from './JobCardSkeleton.module.css';

const JobCardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.icon}></div>
      <div className={styles.content}>
        <div className={styles.title}></div>
        <div className={styles.company}></div>
        <div className={styles.meta}>
          <div className={styles.type}></div>
          <div className={styles.location}></div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;