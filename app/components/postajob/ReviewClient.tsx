"use client";
import React, { useEffect } from "react";
import styles from "./ReviewClient.module.css";
import { JSONContent } from "@tiptap/react";
import Draft from "@/app/components/general/Draft";
import Button from "../general/Button";

interface ReviewClientProps {
  image: string;
  companyName: string;
  jobTitle: string;
  selectedLocations: string[];
  jobType: string;
  experienceLevel: string;
  educationalDegree: string;
  min: string;
  max: string;
  visa: boolean;
  description: JSONContent;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewClient: React.FC<ReviewClientProps> = ({
  image,
  companyName,
  jobTitle,
  selectedLocations,
  jobType,
  experienceLevel,
  educationalDegree,
  min,
  max,
  visa,
  description,
  setPage,
}) => {
  const Checkout = () => {
    setPage(2);
  };

  useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(description);
  }, [description]);

  return (
    <div className={styles.container}>
      <div className={`${styles.centerDiv} ${styles.logo}`}>
        <img src={image} className={styles.companyLogo}  alt="Description"/>
      </div>

      <div className={`${styles.centerDiv} ${styles.companyName}`}>
        {companyName}
      </div>
      
      <div className={`${styles.centerDiv} ${styles.JobTitle}`}>{jobTitle}</div>

      <div className={`${styles.centerDiv} ${styles.Location}`}>
        {selectedLocations}
      </div>

      <div className={`${styles.centerDiv} ${styles.lineDiv}`}>
        <div className={styles.line}></div>
      </div>

      <div className={`${styles.centerDiv} ${styles.DropdownGroup}`}>
        {jobType}
      </div>

      <div className={`${styles.centerDiv} ${styles.DropdownGroup}`}>
        {experienceLevel}
      </div>

      <div className={`${styles.centerDiv} ${styles.DropdownGroup}`}>
        {educationalDegree}
      </div>

      <div className={`${styles.centerDiv} ${styles.Salary}`}>
        Salary Min ${min} - Salary Max ${max}
      </div>

      <div className={`${styles.centerDiv} ${styles.Description}`}>
        <Draft show content={description} />
      </div>

      <div className={`${styles.Continue}`}>
        <Button
          onClick={Checkout}
          text="Save and Checkout"
          paddingTop={16}
          paddingBottom={16}
          paddingLeft={27}
          paddingRight={28}
          fontSize={15}
        />
      </div>
    </div>
  );
};

export default ReviewClient;
