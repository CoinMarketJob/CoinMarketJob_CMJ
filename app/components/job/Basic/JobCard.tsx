"use client";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./JobCard.module.css";
import { Job } from "@prisma/client";
import Icon from "../../general/Icon";
import { formatJobType } from "@/utils/formatter";
import { formatSalary } from "@/utils/formatter";
import { useJobs } from "@/hooks/useJobs";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  collapsed?: boolean;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onClick,
  collapsed,
  isSelected,
  onSelect,
}) => {
  const { filteredJobs, setFilteredJobs } = useJobs();
  const id = job.id;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsSaved(savedJobs.includes(job.id));
  }, [job.id]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo`;
    return `${Math.floor(diffInSeconds / 31536000)}y`;
  };

  const JobSave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    if (isSaved) {
      const updatedSavedJobs = savedJobs.filter((id: number) => id !== job.id);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
      setIsSaved(false);
    } else {
      savedJobs.push(job.id);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      setIsSaved(true);
    }
  };

  const JobSelect = () => {
    onSelect(job.id);
    onClick(job);
  };

  return (
    <div
      className={`${styles.card} ${collapsed ? styles.collapsed : ""} ${
        isSelected ? styles.active : ""
      }`}
      onClick={JobSelect}
      key={job.id}
    >
      <div className={styles.icon}>
        <img
          src={job.logo || "/default-logo.png"}
          alt={`${job.companyName || "Company"} Logo`}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{job.jobTitle}</h2>
        <p className={styles.company}>{job.companyName || "Unknown Company"}</p>
        <p className={styles.meta}>
          <span className={styles.type}>{formatJobType(job.jobType)}</span>
          <span className={styles.location}>
            {job.location || "Unknown Location"}
          </span>
          <span className={styles.location}>
  {job.salaryMin && job.salaryMax
    ? `${formatSalary(job.salaryMin)} - ${formatSalary(job.salaryMax)}`
    : job.salaryMin
    ? formatSalary(job.salaryMin)
    : job.salaryMax
    ? formatSalary(job.salaryMax)
    : ""}
</span>
          
        </p>
      </div>
      <div className={styles.actions}>
  <div>
    <Icon onClick={JobSave} hoverSize={45} hoverContent={isSaved ? "Unsave" : "Save"}>
      {isSaved ? (
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 2.25C1 1.00781 2.00781 0 3.25 0V2.25V20.6906L9.34844 16.3359C9.7375 16.0547 10.2672 16.0547 10.6562 16.3359L16.75 20.6906V2.25H3.25V0H16.75C17.9922 0 19 1.00781 19 2.25V22.875C19 23.2969 18.7656 23.6812 18.3906 23.8734C18.0156 24.0656 17.5656 24.0328 17.2234 23.789L10 18.6328L2.77656 23.789C2.43438 24.0328 1.98438 24.0656 1.60938 23.8734C1.23438 23.6812 1 23.2969 1 22.875V2.25Z" fill="#999999"/>
<rect x="3" y="2" width="14" height="16" fill="#999999"/>
<path d="M2.87486 21.0326L3.36928 14.8815L7.8654 17.4028L2.87486 21.0326Z" fill="#999999"/>
<path d="M17.3123 21.9632L12.2789 18.3929L16.7448 15.8183L17.3123 21.9632Z" fill="#999999"/>
</svg>

        
        
      ) : (
        <svg
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2.25C0 1.00781 1.00781 0 2.25 0V2.25V20.6906L8.34844 16.3359C8.7375 16.0547 9.26719 16.0547 9.65625 16.3359L15.75 20.6906V2.25H2.25V0H15.75C16.9922 0 18 1.00781 18 2.25V22.875C18 23.2969 17.7656 23.6812 17.3906 23.8734C17.0156 24.0656 16.5656 24.0328 16.2234 23.789L9 18.6328L1.77656 23.789C1.43438 24.0328 0.984375 24.0656 0.609375 23.8734C0.234375 23.6812 0 22.875V2.25Z"
                fill={"#242220"}
                className="svg-icon"
                fillOpacity={"0.2"}
              />
            </svg>
      )}
    </Icon>
  </div>
</div>

      <div className={styles.timeAgo}>
        {formatTimeAgo(new Date(job.date))}
      </div>
    </div>
  );
};

export default JobCard;
