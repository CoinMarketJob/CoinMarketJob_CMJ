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
  visa: boolean | undefined;
  description: JSONContent;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  locationType: string;
  unit: string;
  single: string;
  showSalary: boolean;
  questions: string[];
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
  locationType,
  unit,
  single,
  showSalary,
  questions,
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

      <div className={`${styles.centerDiv} ${styles.DropdownGroup}`}>
        Location Type: {locationType}
      </div>

      <div className={`${styles.centerDiv} ${styles.DropdownGroup}`}>
        Visa Sponsorship: {visa ? "Yes" : "No"}
      </div>

      <div className={`${styles.centerDiv} ${styles.Salary}`}>
        {showSalary ? (
          <>
            Salary: {single ? `$${single}` : `$${min} - $${max}`} per {unit}
          </>
        ) : (
          "Salary not displayed"
        )}
      </div>

      {questions.length > 0 && (
        <div className={`${styles.centerDiv} ${styles.Questions}`}>
          <h3>Screening Questions:</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}

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
