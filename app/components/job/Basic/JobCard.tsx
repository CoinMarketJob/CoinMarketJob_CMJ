"use client";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./JobCard.module.css";
import { Job } from "@prisma/client";
import Icon from "../../general/Icon";
import { formatJobType } from "@/utils/formatter";
import { useJobs } from "@/hooks/useJobs";
import { useDrag } from "react-dnd";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  collapsed?: boolean;
  onDrop: (id: number, list: string) => void;
  onDragBegin: () => void;
  onDragEnd: () => void;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const ItemTypes = {
  CARD: "card",
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  onClick,
  collapsed,
  onDrop,
  onDragBegin,
  onDragEnd,
  isSelected,
  onSelect,
}) => {
  const { filteredJobs, setFilteredJobs } = useJobs();
  const id = job.id;
  const cardType = "left";

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => {
        onDragBegin();
        return { id, cardType };
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<{ list: string }>();
        console.log(monitor);
        if (item && dropResult) {
          onDrop(item.id, dropResult.list);
        }

        if (!monitor.didDrop() || dropResult?.list === "left") {
          onDragEnd();
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, cardType, onDragBegin, onDrop, onDragEnd]
  );

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

  const dragRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        drag(node);
      }
    },
    [drag]
  );

  return (
    <div
      ref={dragRef}
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
        </p>
      </div>
      <div className={styles.actions}>
        <div>
          <Icon onClick={JobSave} hoverSize={45} hoverContent={isSaved ? "Unsave" : "Save"}>
            <svg
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2.25C0 1.00781 1.00781 0 2.25 0V2.25V20.6906L8.34844 16.3359C8.7375 16.0547 9.26719 16.0547 9.65625 16.3359L15.75 20.6906V2.25H2.25V0H15.75C16.9922 0 18 1.00781 18 2.25V22.875C18 23.2969 17.7656 23.6812 17.3906 23.8734C17.0156 24.0656 16.5656 24.0328 16.2234 23.789L9 18.6328L1.77656 23.789C1.43438 24.0328 0.984375 24.0656 0.609375 23.8734C0.234375 23.6812 0 22.875V2.25Z"
                fill={isSaved ? "#242220" : "#242220"}
                className="svg-icon"
                fillOpacity={isSaved ? "1" : "0.2"}
              />
            </svg>
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
