"use client";
import React, { useState } from "react";
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
}) => {
  const [isActive, setIsActive] = useState(false);
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
      console.log(item);
      console.log(dropResult);
      if (item && dropResult) {
        onDrop(item.id, dropResult.list);
      } else if (dropResult?.list == "left") {
        onDragEnd();
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

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
    setIsActive(true);
    onClick(job);
  };

  return (
    <div
      ref={drag}
      className={`${styles.card} ${collapsed ? styles.collapsed : ""} ${
        isActive ? styles.active : ""
      }`}
      onClick={JobSelect}
    >
      <div className={styles.icon}>
        <img src={job.logo} alt={`${job.companyName} Logo`} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{job.jobTitle}</h2>
        <p className={styles.company}>{job.companyName}</p>
        <p className={styles.meta}>
          <span className={styles.type}>{formatJobType(job.jobType)}</span>
          <span className={styles.location}>{job.location}</span>
        </p>
      </div>
      <div className={styles.actions}>
        <div>
          <Icon onClick={JobClose} hoverSize={14} hoverContent="Close">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 9.32876L1.60303 15.7261C1.42838 15.9005 1.20886 15.9898 0.944477 15.994C0.680301 15.998 0.456792 15.9087 0.273949 15.7261C0.0913163 15.5432 0 15.3217 0 15.0615C0 14.8013 0.0913163 14.5798 0.273949 14.397L6.67124 8L0.273949 1.60303C0.0995127 1.42838 0.010193 1.20886 0.00598975 0.944478C0.00199664 0.680302 0.0913163 0.456792 0.273949 0.273949C0.456792 0.0913163 0.678305 0 0.938488 0C1.19867 0 1.42018 0.0913163 1.60303 0.273949L8 6.67124L14.397 0.273949C14.5716 0.0995127 14.7911 0.010193 15.0555 0.00598975C15.3197 0.00199664 15.5432 0.0913163 15.7261 0.273949C15.9087 0.456792 16 0.678305 16 0.938488C16 1.19867 15.9087 1.42018 15.7261 1.60303L9.32876 8L15.7261 14.397C15.9005 14.5716 15.9898 14.7911 15.994 15.0555C15.998 15.3197 15.9087 15.5432 15.7261 15.7261C15.5432 15.9087 15.3217 16 15.0615 16C14.8013 16 14.5798 15.9087 14.397 15.7261L8 9.32876Z"
                fill="#242220"
                className="svg-icon"
                fill-opacity="0.2"
              />
            </svg>
          </Icon>
        </div>
        <div>
          <Icon onClick={JobSave} hoverSize={14} hoverContent="Save">
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

export default JobCard;
