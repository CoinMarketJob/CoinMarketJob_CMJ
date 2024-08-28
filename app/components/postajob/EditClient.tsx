import React, { useState, useEffect } from "react";
import styles from "./EditClient.module.css";
import JobTitle from "./JobTitle";
import LocationSelector from "../location/LocationSelector";
import Dropdown from "../general/Dropdown";
import Input from "../general/Input";
import Draft from "@/app/components/general/Draft";
import { motion } from "framer-motion";
import { JSONContent } from "@tiptap/react";
import Button from "../general/Button";
import ToggleSwitch from "../general/Toggle";
import Selection from "../general/Checkbox";
import Icon from "../general/Icon";

interface EditClientProps {
  image: string;
  companyName: string;
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  locationType: string;
  setLocationType: React.Dispatch<React.SetStateAction<string>>;
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
  single: string;
  setSingle: React.Dispatch<React.SetStateAction<string>>;
  showSalary: boolean;
  setShowSalary: React.Dispatch<React.SetStateAction<boolean>>;
  visa: boolean | undefined;
  setVisa: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  description: JSONContent;
  setDescription: React.Dispatch<React.SetStateAction<JSONContent>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  questions: string[];
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditClient: React.FC<EditClientProps> = ({
  image,
  companyName,
  jobTitle,
  setJobTitle,
  locationType,
  setLocationType,
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
  showSalary,
  setShowSalary,
  description,
  setDescription,
  setPage,
  single,
  setSingle,
  questions,
  setQuestions,
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
  const chooseLocationOptions = [
    { value: 'Current Location', label: 'Current Location' },
    { value: 'London', label: 'London' },
    { value: 'New York', label: 'New York' },
    { value: 'Papua New Guinea', label: 'Papua New Guinea' },
    { value: 'San Fransisco', label: 'San Fransisco' },
    { value: 'Las Vegas', label: 'Las Vegas' },
  ];

  const [QuestionAddShow, setQuestionAddShow] = useState<boolean>(false);
  const [QuestionInput, setQuestionInput] = useState<string | undefined>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setQuestionInput(questions[index]);
    setQuestionAddShow(true);
  };

  const handleDelete = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const Save = () => {
    if (QuestionInput) {
      if (editingIndex !== null) {
        // Edit existing question
        const newQuestions = [...questions];
        newQuestions[editingIndex] = QuestionInput;
        setQuestions(newQuestions);
        setEditingIndex(null);
      } else {
        // Add new question
        setQuestions([...questions, QuestionInput]);
      }
      setQuestionInput("");
      setQuestionAddShow(false);
    }
  };

  const descriptionDraftChange = (content: JSONContent) => {
    setDescription(content);
  };

  const Review = () => {
    setPage(1);
  };

  const validateForm = () => {
    if (
      jobTitle &&
      jobType &&
      experienceLevel &&
      educationalDegree 
      
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };
  useEffect(() => {
    validateForm();
  }, [
    jobTitle,
    locationType,
    jobType,
    experienceLevel,
    educationalDegree,
    min,
    max,
    single,
    description,
  ]);
    

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
                      label="Choose Location"
                      options={chooseLocationOptions}
                      selectedLocation={selectedLocations}
                      setSelectedLocation={setSelectedLocations}
                      locationType={locationType}
                      setLocationType={setLocationType}
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
        <div className={`${styles.SalaryValueAndVisaGroup}`}>
          <div className={`${styles.MaxMinContainerDiv}`}>
            <div className={`${styles.MinMaxContainer}`}>
              <Input
                id="min"
                type="number"
                required={false}
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="Min"
              />
            </div>
            <span className={`${styles.SpaceMinMax}`}>-</span>
            <div className={`${styles.MinMaxContainer}`}>
              <Input
                id="max"
                type="number"
                required={false}
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Max"
              />
            </div>
            <span className={`${styles.SpaceUnit}`}>/</span>
            <span className={`${styles.Unit}`}>Year</span>
            <span className={`${styles.Ortext}`}>or</span>
            <div className={`${styles.SingleSalary}`}>
              <Input
                id="single"
                type="number"
                required={false}
                value={single}
                onChange={(e) => setSingle(e.target.value)}
                placeholder="Enter a single value"
              />
            </div>

            <div>
              <ToggleSwitch
                title="Visa Sponsorship"
                sliderName="visa"
                switchState={visa}
                setSwitchState={setVisa}
              />
            </div>
          </div>
        </div>

        <Selection
          name="salaryShow"
          id="salaryShow"
          value={showSalary}
          onChange={(selectedValue) => setShowSalary(selectedValue)}
          label="Don’t show in job listing"
        />
      </div>

      <div className={`${styles.QuestionsGroup}`}>
        <div className={`${styles.AddQuestionGroup}`}>
          <span className={`${styles.AddQuestion}`}>Add custom question</span>
          <Icon onClick={(e) => setQuestionAddShow(true)} hoverSize={40}>
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.18996 9.60416L9.19013 16.3893C9.19002 16.5745 9.12097 16.7383 8.98299 16.8807C8.84501 17.0229 8.6791 17.0941 8.48528 17.0942C8.29146 17.0941 8.12556 17.025 7.98757 16.887C7.84959 16.7491 7.78054 16.5832 7.78043 16.3893L7.7806 9.60416L0.995417 9.60433C0.810288 9.60421 0.646503 9.53517 0.504062 9.39718C0.361843 9.2592 0.290678 9.0933 0.290567 8.89948C0.290678 8.70565 0.359725 8.53975 0.497708 8.40177C0.635691 8.26378 0.801594 8.19474 0.995416 8.19463L7.7806 8.19479L7.78043 1.40961C7.78054 1.22448 7.84959 1.0607 7.98757 0.918256C8.12556 0.776037 8.29146 0.704872 8.48528 0.70476C8.6791 0.704872 8.84501 0.773919 8.98299 0.911902C9.12097 1.04989 9.19002 1.21579 9.19013 1.40961L9.18996 8.19479L15.9751 8.19463C16.1603 8.19474 16.3241 8.26378 16.4665 8.40177C16.6087 8.53975 16.6799 8.70565 16.68 8.89948C16.6799 9.0933 16.6108 9.2592 16.4729 9.39718C16.3349 9.53517 16.169 9.60421 15.9751 9.60433L9.18996 9.60416Z"
                fill="#242220"
                fill-opacity="0.4"
                className="svg-icon"
              />
            </svg>
          </Icon>
        </div>

        <div className={styles.QuestionsArea}>
          {questions.map((question, index) => (
            <div key={index} className={styles.QuestionItem}>
              <span>{question}</span>
              <div className={styles.QuestionActions}>
                <Icon onClick={() => handleEdit(index)} hoverSize={30}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 11.25V13.5H3.75L11.8125 5.4375L9.5625 3.1875L1.5 11.25ZM13.7812 3.46875C14.0625 3.1875 14.0625 2.8125 13.7812 2.53125L12.4688 1.21875C12.1875 0.9375 11.8125 0.9375 11.5312 1.21875L10.5 2.25L12.75 4.5L13.7812 3.46875Z"
                      fill="currentColor"
                    />
                  </svg>
                </Icon>
                <Icon onClick={() => handleDelete(index)} hoverSize={30}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                      fill="currentColor"
                    />
                  </svg>
                </Icon>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{ display: !QuestionAddShow ? "none" : "" }}
          className={`${styles.QuestionPopup}`}
        >
          <div className={`${styles.QuestionDiv}`}>
            <Input
              id="Question"
              type="text"
              value={QuestionInput || ""}
              required={false}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="Type your question"
            />
          </div>

          <div className={styles.ButtonGroup}>
            <Button
              text="Cancel"
              onClick={() => setQuestionAddShow(false)}
              backgroundColor="#FFFFFF"
              textColor="#000000"
              fontSize={14}
              fontWeight={400}
            />

            <Button
              text="Save"
              onClick={Save}
              fontSize={14}
              fontWeight={400}
              paddingTop={12}
              paddingBottom={12}
              paddingLeft={27}
              paddingRight={28}
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
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default EditClient;
