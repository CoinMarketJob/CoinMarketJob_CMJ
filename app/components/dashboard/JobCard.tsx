"use client";
import React, { useState } from "react";
import styles from "./JobCard.module.css";
import Button from "../general/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useJobApplications } from "@/hooks/useApplicationJob";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: any;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const {jobApplications, setJobApplications} = useJobApplications();

  const router = useRouter();

  const formatCreationDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `Created ${month} ${day}`;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const Applications = () => {
    setJobApplications(job);
    router.push("/candidates");
  }

  return (
    <div className={styles.Container} onClick={toggleExpand}>
      <table className={styles.Table}>
        <tbody>
          <tr>
            <td className={styles.ColJobInfo}>
              <div className={styles.JobTitle}>{job.jobTitle}</div>
              <div className={styles.ActiveEndDate}>Active</div>
            </td>
            <td className={styles.ColStatistic}>
              <div>{job.appliedJobs.length}</div>
              <div>Applications</div>
            </td>
            <td className={styles.ColArrow}>
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                width="32"
                height="17"
                viewBox="0 0 32 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 14.4633L30.1469 0.316384C30.3578 0.105461 30.6139 0 30.9153 0C31.2166 0 31.4727 0.105461 31.6836 0.316384C31.8945 0.527307 32 0.783427 32 1.08475C32 1.38606 31.8945 1.64218 31.6836 1.85311L17.8983 15.6384C17.6271 15.9096 17.3258 16.1055 16.9944 16.226C16.6629 16.3465 16.3315 16.4068 16 16.4068C15.6686 16.4068 15.3371 16.3465 15.0056 16.226C14.6742 16.1055 14.3729 15.9096 14.1017 15.6384L0.316383 1.85311C0.105461 1.64218 0 1.38606 0 1.08475C0 0.783427 0.105461 0.527307 0.316383 0.316384C0.527308 0.105461 0.783428 0 1.08475 0C1.38606 0 1.64219 0.105461 1.85311 0.316384L16 14.4633Z"
                  fill="#999999"
                />
              </motion.svg>
            </td>
          </tr>
          <AnimatePresence>
            {isExpanded && (
              <motion.tr
                className={styles.LineDetail}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className={styles.ColJobInfo}>
                  <div className={styles.Location}>{job.location}</div>
                  <div className={styles.CreationDate}>{formatCreationDate(job.date)}</div>
                </td>
                <td className={styles.ColStatistic}>
                  <Button
                    text="Applications"
                    onClick={Applications}
                    paddingTop={12}
                    paddingBottom={12}
                    paddingLeft={12}
                    paddingRight={12}
                    backgroundColor="#FFFFFF"
                    textColor="#242220"
                    borderLine={1}
                    borderColor="#E7E5E4"
                    fontSize={14}
                    fontWeight={500}
                  />
                </td>
                <td className={styles.ColArrow}></td>
              </motion.tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default JobCard;