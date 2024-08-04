import React, { useState } from "react";
import styles from "./EditClient.module.css";
import JobTitle from "./JobTitle";
import LocationSelector from "../location/LocationSelector";
import Dropdown from "../general/Dropdown";
import Input from "../general/Input";
import Draft from "@/app/components/general/Draft";
import { motion } from "framer-motion";
import { JSONContent } from "@tiptap/react";
import Button from "../general/Button";

interface EditClientProps {
  image: string;
  companyName: string;
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
  jobType: string;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  experienceLevel: string;
  setExperienceLevel: React.Dispatch<React.SetStateAction<string>>;
  educationalDegree: string;
  setEducationalDegree: React.Dispatch<React.SetStateAction<string>>;
  min: string;
  setMin: React.Dispatch<React.SetStateAction<string>>;
  max: string;
  setMax: React.Dispatch<React.SetStateAction<string>>;
  visa: boolean;
  setVisa: React.Dispatch<React.SetStateAction<boolean>>;
  description: JSONContent;
  setDescription: React.Dispatch<React.SetStateAction<JSONContent>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const EditClient: React.FC<EditClientProps> = ({
  image,
  companyName,
  jobTitle,
  setJobTitle,
  selectedLocations,
  setSelectedLocations,
  jobType,
  setJobType,
  experienceLevel,
  setExperienceLevel,
  educationalDegree,
  setEducationalDegree,
  min,
  setMin,
  max,
  setMax,
  visa,
  setVisa,
  description,
  setDescription,
  setPage,
}) => {
  const jobTypes = [
    { value: "Internship", label: "Internship" },
    { value: "PartTime", label: "Part-time" },
    { value: "FullTime", label: "Full-time" },
    { value: "Contract", label: "Contract" },
    { value: "Temporary", label: "Temporary" },
    { value: "Other", label: "Other" },
  ];

  const experienceLevels = [
    { value: "EntryLevel", label: "Entry Level" },
    { value: "Junior", label: "Junior" },
    { value: "MidLevel", label: "Mid Level" },
    { value: "Senior", label: "Senior" },
    { value: "Lead", label: "Lead" },
    { value: "Manager", label: "Manager" },
    { value: "Executive", label: "Executive" },
  ];
  const educationalDegrees = [
    { value: "HighSchool", label: "High School" },
    { value: "University", label: "University" },
    { value: "Master", label: "Master" },
    { value: "PhD", label: "PhD" },
  ];

  const descriptionDraftChange = (content: JSONContent) => {
    setDescription(content);
  };

  const Review = () => {
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.centerDiv} ${styles.logo}`}>
        <img src={image} className={styles.companyLogo} alt="Description" />
      </div>

      <div className={`${styles.centerDiv} ${styles.companyName}`}>
        {companyName}
      </div>

      <div className={`${styles.centerDiv}`}>
        <JobTitle jobTitle={jobTitle} setJobTitle={setJobTitle} />
      </div>

      <div className={`${styles.centerDiv}`}>
        <LocationSelector
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </div>

      <div className={`${styles.centerDiv} ${styles.SelectionGroup}`}>
        <div
          className={`${styles.DropDownContainerDiv} ${styles.DropDownContainerDivMargin}`}
        >
          <Dropdown
            id="JobType"
            value={jobType}
            list={jobTypes}
            setValue={setJobType}
            placeholder="Job Type*"
          />
        </div>
        <div
          className={`${styles.DropDownContainerDiv} ${styles.DropDownContainerDivMargin}`}
        >
          <Dropdown
            id="ExperienceLevel"
            value={experienceLevel}
            list={experienceLevels}
            setValue={setExperienceLevel}
            placeholder="Experience Level*"
          />
        </div>
        <div className={`${styles.DropDownContainerDiv}`}>
          <Dropdown
            id="EducationalDegree"
            value={educationalDegree}
            list={educationalDegrees}
            setValue={setEducationalDegree}
            placeholder="Educational Degree*"
          />
        </div>
      </div>

      <div className={`${styles.SalaryGroup}`}>
        <span className={`${styles.SalaryText}`}>Salary</span>

        <div className={`${styles.MaxMinContainerDiv}`}>
          <Input
            id="Min"
            placeholder="Min"
            type="number"
            required
            value={min}
            onChange={(e) => setMin(e.target.value)}
            paddingLeft={24}
          />
        </div>

        <div className={`${styles.SpaceDiv}`}>-</div>

        <div className={`${styles.MaxMinContainerDiv}`}>
          <Input
            id="Max"
            placeholder="Max"
            type="number"
            required
            value={max}
            onChange={(e) => setMax(e.target.value)}
            paddingLeft={24}
          />
        </div>

        <div className={`${styles.ToggleDiv}`}>
          <span className={`${styles.Visa}`}>Visa Sponsorship</span>

          <div
            onClick={() => setVisa(!visa)}
            className={`${styles["delete-toggle-wrapper"]} ${
              visa ? styles["justify-start"] : styles["justify-end"]
            }`}
          >
            <motion.div
              className={`${styles["delete-toggle"]} ${
                visa ? styles["bg-white"] : styles["bg-white"]
              }`}
              layout
              transition={{ type: "spring", stiffness: 0, damping: 30 }}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.JobDescription}`}>
        <span className={`${styles.JobDescriptionText}`}>Job Description*</span>
        <div>
          <Draft onChange={descriptionDraftChange} />
        </div>
      </div>

      <div className={`${styles.Continue}`}>
        <Button
          onClick={Review}
          text="Save and Review"
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

export default EditClient;
