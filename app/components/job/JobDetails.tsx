'use client'
import React, { useState } from 'react';
import styles from './JobDetails.module.css';
import { useRouter } from 'next/navigation';
import { Job } from '@prisma/client';
import Icon from '../general/Icon';
import Button from '../general/Button';
import Draft from '../general/DraftShow';
import { JSONContent } from '@tiptap/react';

interface JobDetailsProps {
    job: Job | null;
    onClose?: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose = () => {} }) => {
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleButtonClick = (jobId: number) => {
        router.push("/applyjob/" + jobId);
    };

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onClose();
    };

    const JobShare = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (job) {
            const shareUrl = `https://beta.coinmarketjob.com/jobs/view/${job.id}`;
            navigator.clipboard.writeText(shareUrl);
            setSuccessMessage("Link Copied to Clipboard");
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        }
    };

    const jobDescription: JSONContent | undefined = job ? job.jobDescription as JSONContent : undefined;

    return (
        <div className={styles.containerJobDetails}>
            {job && (
                <div className={styles.headerJobDetails}>
                    <div className={styles.closeIcon} onClick={handleClose}>
                        <Icon onClick={handleClose} hoverSize={45} hoverContent="Close">
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

                    <div className={styles.actionButtons}>
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
                        <div className={styles.shareButton}>
                            <Icon onClick={JobShare} hoverSize={45} hoverContent="Share">
                                <svg
                                    width="18"
                                    height="29"
                                    viewBox="0 0 27 29"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.1484 24.5C17.1484 22.0147 19.1632 20 21.6484 20C24.1337 20 26.1484 22.0147 26.1484 24.5C26.1484 26.9853 24.1337 29 21.6484 29C19.1632 29 17.1484 26.9853 17.1484 24.5Z"
                                        fill="#A7A7A6"
                                    />
                                    <path
                                        d="M18.1484 24.5C18.1484 22.567 19.7154 21 21.6484 21C23.5814 21 25.1484 22.567 25.1484 24.5C25.1484 26.433 23.5814 28 21.6484 28C19.7154 28 18.1484 26.433 18.1484 24.5Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M0 14.5C0 12.0147 2.01472 10 4.5 10C6.98528 10 9 12.0147 9 14.5C9 16.9853 6.98528 19 4.5 19C2.01472 19 0 16.9853 0 14.5Z"
                                        fill="#A7A7A6"
                                    />
                                    <path
                                        d="M1 14.5C1 12.567 2.567 11 4.5 11C6.433 11 8 12.567 8 14.5C8 16.433 6.433 18 4.5 18C2.567 18 1 16.433 1 14.5Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M17.1484 4.5C17.1484 2.01472 19.1632 0 21.6484 0C24.1337 0 26.1484 2.01472 26.1484 4.5C26.1484 6.98528 24.1337 9 21.6484 9C19.1632 9 17.1484 6.98528 17.1484 4.5Z"
                                        fill="#A7A7A6"
                                    />
                                    <path
                                        d="M18.1484 4.5C18.1484 2.567 19.7154 1 21.6484 1C23.5814 1 25.1484 2.567 25.1484 4.5C25.1484 6.433 23.5814 8 21.6484 8C19.7154 8 18.1484 6.433 18.1484 4.5Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M7.64844 12.093L18.0022 6.04275L18.5068 6.90615L8.15297 12.9564L7.64844 12.093Z"
                                        fill="#A7A7A6"
                                    />
                                    <path
                                        d="M18.006 22.8531L7.61021 16.8753L8.1087 16.0084L18.5045 21.9863L18.006 22.8531Z"
                                        fill="#A7A7A6"
                                    />
                                </svg>
                            </Icon>
                        </div>
                    </div>
                    {successMessage && (
                        <div className={styles.successMessage}>{successMessage}</div>
                    )}
                </div>
            )}

            {job && (
                <div className={styles.section}>
                    {jobDescription && (
                        <Draft content={jobDescription} />
                    )}
                </div>
            )}
        </div>
    );
};

export default JobDetails;
