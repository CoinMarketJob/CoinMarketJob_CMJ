'use client'
import React, { useState } from 'react';
import styles from './JobDetails.module.css';
import { faXmark, faShare, faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { Job } from '@prisma/client';
import Icon from '../general/Icon';
import Button from '../general/Button';
import Draft from '../general/Draft';


interface JobDetailsProps {
    job: Job | null;
    onClose?: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose = () => { } }) => {
    const router = useRouter();

    const handleIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (job) {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleButtonClick = (jobId: number) => {
        router.push("/applyjob/" + jobId);
    };

    return (
        <div className={styles.containerJobDetails}>
            {job && (
                <div className={styles.headerJobDetails}>
                    <div className={styles.logo}>
                        <img src={job.logo} alt={`${job.jobTitle} logo`} />
                    </div>

                    <div className={styles.jobDetails}>
                        <p className={styles.CompanyJobDetails}>{job.companyName}</p>
                        <p className={styles.TitleJobDetails}>{job.jobTitle}</p>
                        <p className={styles.LocationDetails}>{job.location}</p>
                    </div>

                    <div className={styles.shareButton}>
                        <Icon onClick={handleIconClick} hoverSize={40} hoverContent='Share'>
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9088 20C14.0399 20 13.3015 19.696 12.6936 19.0879C12.0857 18.4798 11.7817 17.7414 11.7817 16.8727C11.7817 16.7544 11.7899 16.6319 11.8063 16.5052C11.8227 16.3784 11.8472 16.262 11.8799 16.156L5.24558 12.295C4.95578 12.5561 4.62957 12.7601 4.26695 12.9069C3.90434 13.0538 3.52446 13.1273 3.12732 13.1273C2.25858 13.1273 1.52017 12.8233 0.912103 12.2152C0.304035 11.607 0 10.8685 0 9.99975C0 9.13085 0.304035 8.39245 0.912103 7.78454C1.52017 7.17664 2.25858 6.87268 3.12732 6.87268C3.52446 6.87268 3.90434 6.94616 4.26695 7.0931C4.62957 7.23988 4.95578 7.44385 5.24558 7.70501L11.8799 3.84404C11.8472 3.738 11.8227 3.62158 11.8063 3.49476C11.7899 3.3681 11.7817 3.24562 11.7817 3.12732C11.7817 2.25858 12.0858 1.52017 12.6938 0.912103C13.3021 0.304034 14.0406 0 14.9093 0C15.7782 0 16.5166 0.304034 17.1245 0.912103C17.7324 1.52034 18.0364 2.25882 18.0364 3.12756C18.0364 3.99647 17.7323 4.73487 17.1243 5.34278C16.5162 5.95068 15.7778 6.25463 14.9091 6.25463C14.5119 6.25463 14.132 6.18312 13.7694 6.04011C13.4068 5.89709 13.0806 5.69508 12.7908 5.43408L6.15645 9.28328C6.18918 9.38931 6.21372 9.50574 6.23009 9.63256C6.24645 9.75921 6.25463 9.88169 6.25463 10C6.25463 10.1183 6.24645 10.2408 6.23009 10.3674C6.21372 10.4943 6.18918 10.6107 6.15645 10.7167L12.7908 14.5659C13.0806 14.3049 13.4068 14.1029 13.7694 13.9599C14.132 13.8169 14.5119 13.7454 14.9091 13.7454C15.7778 13.7454 16.5162 14.0494 17.1243 14.6575C17.7323 15.2657 18.0364 16.0042 18.0364 16.8729C18.0364 17.7418 17.7323 18.4802 17.1243 19.0881C16.516 19.696 15.7776 20 14.9088 20Z" fill="#242220" className="svg-icon" fill-opacity="0.4"/>
                            </svg>
                        </Icon>
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
                    <Draft show content={job.jobDescription} />
                </div>
            )}
        </div>
    );
};

export default JobDetails;
