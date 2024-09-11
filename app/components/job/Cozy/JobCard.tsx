"use client";
import React, { useCallback, useRef, useState } from "react";
import styles from "./JobCard.module.css";
import { Job } from "@prisma/client";
import Icon from "../../general/Icon";
import { formatJobType } from "@/utils/formatter";
import { useDrag } from "react-dnd";
import { useJobs } from "@/hooks/useJobs";

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

const Cozy: React.FC<JobCardProps> = ({
  job,
  onClick,
  collapsed,
  onDrop,
  onDragBegin,
  onDragEnd,
  isSelected,
  onSelect
}) => {
  const { filteredJobs, setFilteredJobs } = useJobs();
  const id = job.id;
  const cardType = "left";

  const [{ isDragging }, drag] = useDrag(() => ({
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
  }), [id, cardType, onDragBegin, onDrop, onDragEnd]);

  const JobSave = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const jobId = job.id;
    try {
      const jobData = { jobId };
      const response = await fetch("/api/savedjobs/", {
        method: "POST",
        body: JSON.stringify(jobData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Succes");
      }
    } catch (error) {}
  };
  const JobClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const filter = filteredJobs.filter((x) => x.id !== job.id);
    setFilteredJobs(filter);
  };
  const JobSelect = () => {
    onSelect(job.id);
    onClick(job);
  };
  
  const dragRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      drag(node);
    }
  }, [drag]);

  return (
    <div
      ref={dragRef}
      className={`${styles.card} ${collapsed ? styles.collapsed : ""} ${
        isSelected ? styles.active : ""
      }`}
      onClick={JobSelect}
    >
      <div className={styles.icon}>
        <img 
          src={job.logo || '/default-logo.png'} 
          alt={`${job.companyName || 'Company'} Logo`} 
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{job.jobTitle}</h2>
        <p className={styles.company}>{job.companyName || 'Unknown Company'}</p>
        <p className={styles.meta}>
          <span className={styles.type}>{formatJobType(job.jobType)}</span>
          <span className={styles.location}>{job.location || 'Unknown Location'}</span>
        </p>
      </div>
      <div className={styles.actions}>
        <div>
          <Icon onClick={(e) => e.stopPropagation()} hoverSize={45} hoverContent="Share">
            <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.1484 24.5C17.1484 22.0147 19.1632 20 21.6484 20C24.1337 20 26.1484 22.0147 26.1484 24.5C26.1484 26.9853 24.1337 29 21.6484 29C19.1632 29 17.1484 26.9853 17.1484 24.5Z" fill="#A7A7A6"/>
              <path d="M18.1484 24.5C18.1484 22.567 19.7154 21 21.6484 21C23.5814 21 25.1484 22.567 25.1484 24.5C25.1484 26.433 23.5814 28 21.6484 28C19.7154 28 18.1484 26.433 18.1484 24.5Z" fill="white"/>
              <path d="M0 14.5C0 12.0147 2.01472 10 4.5 10C6.98528 10 9 12.0147 9 14.5C9 16.9853 6.98528 19 4.5 19C2.01472 19 0 16.9853 0 14.5Z" fill="#A7A7A6"/>
              <path d="M1 14.5C1 12.567 2.567 11 4.5 11C6.433 11 8 12.567 8 14.5C8 16.433 6.433 18 4.5 18C2.567 18 1 16.433 1 14.5Z" fill="white"/>
              <path d="M17.1484 4.5C17.1484 2.01472 19.1632 0 21.6484 0C24.1337 0 26.1484 2.01472 26.1484 4.5C26.1484 6.98528 24.1337 9 21.6484 9C19.1632 9 17.1484 6.98528 17.1484 4.5Z" fill="#A7A7A6"/>
              <path d="M18.1484 4.5C18.1484 2.567 19.7154 1 21.6484 1C23.5814 1 25.1484 2.567 25.1484 4.5C25.1484 6.433 23.5814 8 21.6484 8C19.7154 8 18.1484 6.433 18.1484 4.5Z" fill="white"/>
              <path d="M7.64844 12.093L18.0022 6.04275L18.5068 6.90615L8.15297 12.9564L7.64844 12.093Z" fill="#A7A7A6"/>
              <path d="M18.006 22.8531L7.61021 16.8753L8.1087 16.0084L18.5045 21.9863L18.006 22.8531Z" fill="#A7A7A6"/>
            </svg>
          </Icon>
        </div>
        <div>
          <Icon onClick={JobSave} hoverSize={45} hoverContent="Save">
            <svg
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2.25C0 1.00781 1.00781 0 2.25 0V2.25V20.6906L8.34844 16.3359C8.7375 16.0547 9.26719 16.0547 9.65625 16.3359L15.75 20.6906V2.25H2.25V0H15.75C16.9922 0 18 1.00781 18 2.25V22.875C18 23.2969 17.7656 23.6812 17.3906 23.8734C17.0156 24.0656 16.5656 24.0328 16.2234 23.789L9 18.6328L1.77656 23.789C1.43438 24.0328 0.984375 24.0656 0.609375 23.8734C0.234375 23.6812 0 23.2969 0 22.875V2.25Z"
                fill="#242220"
                className="svg-icon"
                fill-opacity="0.2"
              />
            </svg>
          </Icon>
        </div>
      </div>
    </div>
  );
};

export default Cozy;
