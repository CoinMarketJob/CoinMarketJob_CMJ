"use client";
import React, { useState, useEffect, useRef } from "react";
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
import Checkbox from "../general/Checkbox";

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
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
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
  unit,
  setUnit,
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
  const [isImageLoading, setIsImageLoading] = useState(true);

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
  const salaryUnit = [
    { value: "Year", label: "Year" },
    { value: "Month", label: "Month" },
    { value: "Week", label: "Week" },
    { value: "Day", label: "Day" },
    { value: "Hour", label: "Hour" },
  ];

  const salaryMoneyUnit = [{ value: "USD", label: "USD" }];

  const [QuestionAddShow, setQuestionAddShow] = useState<boolean>(false);
  const [QuestionInput, setQuestionInput] = useState<string | undefined>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const QuestionPopupRef = useRef<HTMLDivElement>(null);

  const [salaryType, setSalaryType] = useState<string>("Exact value");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        QuestionPopupRef.current &&
        !QuestionPopupRef.current.contains(event.target as Node)
      ) {
        setQuestionAddShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (min || max) {
      setSingle("");
    }
  }, [min, max]);

  useEffect(() => {
    if (single) {
      setMin("");
      setMax("");
    }
  }, [single]);

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
    if (jobTitle && jobType && experienceLevel && educationalDegree) {
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

      <div className={`${styles.centerDiv} ${styles.jobTitleContainer}`}>
        <JobTitle jobTitle={jobTitle} setJobTitle={setJobTitle} />
      </div>

      <div className={`${styles.centerDiv} ${styles.locationContainer}`}>
        <LocationSelector
          label="Choose Location*"
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
        <div className={`${styles.SalaryInfoGroup}`}>
          <span className={`${styles.SalaryText}`}>Salary</span>
          <span
            className={`${styles.ChangeSalary}`}
            onClick={() =>
              setSalaryType(
                salaryType === "Exact value" ? "Range" : "Exact value"
              )
            }
          >
            {salaryType}
          </span>
        </div>
        {salaryType === "Exact value" ? (
          <div className={`${styles.SalaryInputGroup}`}>
            <Input
              id="Min"
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="Min"
            />
            <span className={`${styles.SalarySeparator}`}>-</span>
            <Input
              id="Max"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="Max"
            />
          </div>
        ) : (
          <div className={`${styles.SalaryInputGroup}`}>
            <div style={{ width: "100%" }}>
              <Input
                id="single"
                type="number"
                value={single}
                onChange={(e) => setSingle(e.target.value)}
                placeholder="Value"
              />
            </div>
          </div>
        )}

        <div className={`${styles.SalaryUnitGroup}`}>
          <div className={styles.salaryDropdown}>
            <Dropdown
              id="SalaryMoneyUnit"
              value={"USD"}
              list={salaryMoneyUnit}
              setValue={() => {}}
              placeholder="USD"
            />
          </div>

          <div className={styles.salaryDropdown}>
            <Dropdown
              id="SalaryUnit"
              value={unit}
              list={salaryUnit}
              setValue={setUnit}
              placeholder="Salary Unit"
            />
          </div>
        </div>

        <div className={`${styles.SalaryShow}`}>
          <Selection
            name="salaryShow"
            id="salaryShow"
            value={showSalary}
            onChange={(selectedValue) => setShowSalary(selectedValue)}
            label="Don't show in job listing"
          />
        </div>
      </div>
      
      <div className={`${styles.VisaSponsorship}`}>
        <ToggleSwitch
          title="Visa Sponsorship"
          sliderName="visa"
          switchState={visa}
          setSwitchState={setVisa}
        />
      </div>

      <div className={`${styles.QuestionsGroup}`}>
        <div className={styles.QuestionsArea}>
          {questions.map((question, index) => (
            <div key={index} className={styles.QuestionItem}>
              <span className={styles.QuestionText}>{question}</span>
              <div className={styles.QuestionActions}>
                <div className={styles.DeleteIcon}>
                  <Icon onClick={() => handleDelete(index)} hoverSize={30}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M6 6.99657L1.20227 11.7945C1.07128 11.9254 0.906648 11.9924 0.708358 11.9955C0.510226 11.9985 0.342594 11.9315 0.205462 11.7945C0.0684873 11.6574 0 11.4913 0 11.2961C0 11.101 0.0684873 10.9349 0.205462 10.7977L5.00343 6L0.205462 1.20227C0.0746346 1.07129 0.00764477 0.906648 0.00449231 0.708358C0.00149748 0.510226 0.0684873 0.342594 0.205462 0.205462C0.342594 0.0684873 0.508728 0 0.703866 0C0.899003 0 1.06514 0.0684873 1.20227 0.205462L6 5.00343L10.7977 0.205462C10.9287 0.0746346 11.0934 0.00764477 11.2916 0.00449231C11.4898 0.00149748 11.6574 0.0684873 11.7945 0.205462C11.9315 0.342594 12 0.508729 12 0.703866C12 0.899003 11.9315 1.06514 11.7945 1.20227L6.99657 6L11.7945 10.7977C11.9254 10.9287 11.9924 11.0934 11.9955 11.2916C11.9985 11.4898 11.9315 11.6574 11.7945 11.7945C11.6574 11.9315 11.4913 12 11.2961 12C11.101 12 10.9349 11.9315 10.7977 11.7945L6 6.99657Z"
                        fill="#999999"
                        fill-opacity="0.6"
                      />
                    </svg>
                  </Icon>
                </div>
                <div className={styles.EditIcon}>
                  <Icon onClick={() => handleEdit(index)} hoverSize={30}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M8.50988 0.439897L7.37427 1.57542L10.4245 4.62537L11.5601 3.48985C12.1466 2.90332 12.1466 1.95314 11.5601 1.36661L10.6356 0.439897C10.049 -0.146632 9.0988 -0.146632 8.51222 0.439897H8.50988ZM6.844 2.10564L1.37477 7.57679C1.13075 7.82079 0.952436 8.12344 0.853891 8.45424L0.0233004 11.2766C-0.0353571 11.476 0.0186078 11.6895 0.164079 11.835C0.309549 11.9805 0.523063 12.0344 0.720152 11.9781L3.54275 11.1476C3.87358 11.0491 4.17626 10.8707 4.42027 10.6267L9.89419 5.1556L6.844 2.10564Z"
                        fill="#999999"
                        fill-opacity="0.6"
                      />
                    </svg>
                  </Icon>
                </div>
              </div>
            </div>
          ))}
        </div>

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

        <div
          style={{ display: !QuestionAddShow ? "none" : "" }}
          className={`${styles.QuestionPopup}`}
          ref={QuestionPopupRef}
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
