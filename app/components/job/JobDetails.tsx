'use client'
import React from 'react';
import styles from './JobDetails.module.css';
import { useRouter } from 'next/navigation';
import { Job } from '@prisma/client';
import Icon from '../general/Icon';
import Button from '../general/Button';
import Draft from '../general/Draft';
import { JSONContent } from '@tiptap/react';

interface JobDetailsProps {
    job: Job | null;
    onClose?: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose = () => {} }) => {
    const router = useRouter();

    const handleButtonClick = (jobId: number) => {
        router.push("/applyjob/" + jobId);
    };

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onClose();
    };

    const jobDescription: JSONContent | undefined = job ? job.jobDescription as JSONContent : undefined;

    return (
        <div className={styles.containerJobDetails}>
            {job && (
                <div className={styles.headerJobDetails}>
                    <div className={styles.closeIcon} onClick={handleClose}>
                        <Icon onClick={handleClose} hoverSize={14} hoverContent="Close">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#242220" fillOpacity="0.2"/>
                            </svg>
                        </Icon>
                    </div>
                    <div className={styles.logo}>
                        <img 
                            src={job.logo || '/default-logo.png'} 
                            alt={`${job.jobTitle || 'Job'} logo`} 
                        />
                    </div>

                    <div className={styles.jobDetails}>
                        <p className={styles.CompanyJobDetails}>{job.companyName || 'Unknown Company'}</p>
                        <p className={styles.TitleJobDetails}>{job.jobTitle || 'Untitled Job'}</p>
                        <p className={styles.LocationDetails}>{job.location || 'Unknown Location'}</p>
                    </div>

                    <div className={styles.applyButton}>
                        <Button onClick={() => handleButtonClick(job.id)} textColor='#FFFFFF' backgroundColor='#242220' 
                        text='Apply' fontSize={18} fontWeight={500}
                        paddingLeft={48} paddingRight={49}
                        paddingTop={12} paddingBottom={12} />
                    </div>
                </div>
            )}

            {job && (
                <div className={styles.section}>
                    {jobDescription && (
                        <Draft show content={jobDescription} />
                    )}
                </div>
            )}
        </div>
    );
};

export default JobDetails;
