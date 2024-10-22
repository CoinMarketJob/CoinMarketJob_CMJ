"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./EditClient.module.css";
import JobTitle from "./JobTitle";
import LocationSelector from "../location/LocationSelector";
import Dropdown from "../general/Dropdown";
import Input from "../general/Input";
import Draft from "../general/Draft";
import QuestionDraft from "./QuestionDraft";
import { motion } from "framer-motion";
import { JSONContent } from "@tiptap/react";
import Button from "../general/Button";
import ToggleSwitch from "../general/Toggle";
import Selection from "../general/Checkbox";
import Icon from "../general/Icon";
import Checkbox from "../general/Checkbox";
import { v4 as uuidv4 } from 'uuid';

interface EditClientProps {
  image: string;
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
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
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const EditClient: React.FC<EditClientProps> = ({
  image,
  companyName,
  setCompanyName,
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
  selectedImage,
  setSelectedImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const jobTypes = [
    { value: "Internship", label: "Internship" },
    { value: "PartTime", label: "Part-time" },
    { value: "FullTime", label: "Full-time" },
    { value: "Contract", label: "Contract" },
    { value: "Temporary", label: "Temporary" },
    { value: "Other", label: "Other" },
  ];
  /* be carefull do not duplicate */
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

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const [QuestionAddShow, setQuestionAddShow] = useState<boolean>(false);
  const [QuestionInput, setQuestionInput] = useState<string | undefined>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const QuestionPopupRef = useRef<HTMLDivElement>(null);
  const [questionDrafts, setQuestionDrafts] = useState<{ id: string, content: string }[]>([
    { id: uuidv4(), content: '' }
  ]); // Initialize with one draft


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



  const Save = () => {
    if (QuestionInput) {
      if (editingIndex !== null) {
        // Mevcut soruyu düzenle
        const newQuestions = [...questions];
        newQuestions[editingIndex] = QuestionInput;
        setQuestions(newQuestions);
        setEditingIndex(null);
      } else {
        // Yeni soru ekle
        setQuestions([...questions, QuestionInput]); 
      }
  
      // Altına yeni boş `QuestionDraft` ekle
      setQuestions(prev => [...prev, ""]); // Yeni boş soru taslağı
  
      setQuestionInput(""); // Input'u temizle
      setQuestionAddShow(false);
    }
  };

  const addNewDraft = () => {
    setQuestionDrafts([...questionDrafts, { id: uuidv4(), content: '' }]);
  };


  const handleSaveDraft = (id: string, content: string) => {
    setQuestionDrafts(questionDrafts.map(draft => 
      draft.id === id ? { ...draft, content } : draft
    ));
  
    // Add a new empty draft if the last one has content
    if (questionDrafts[questionDrafts.length - 1].content !== '') {
      addNewDraft();
    }
  };
  
  const handleDeleteDraft = (id: string) => {
    const updatedDrafts = questionDrafts.filter(draft => draft.id !== id); // Delete by ID
  
    setQuestionDrafts(updatedDrafts);
  
    // Add a new empty draft if none exist or the last draft has content
    if (updatedDrafts.length === 0 || updatedDrafts[updatedDrafts.length - 1].content !== '') {
      setQuestionDrafts([...updatedDrafts, { id: uuidv4(), content: '' }]); // Ensure at least one empty draft
    }
  };
  
  
  
  
  
  

  const Review = () => {
    setPage(1);
  };
  const validateForm = () => {
    if (jobTitle) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };
  useEffect(() => {
    validateForm();
  }, [jobTitle]);

  return (
    <div className={styles.container}>
      <div className={styles.companyLogoSection}>
        <div className={styles.companyLogoWrapper}>
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : image}
            className={styles.companyLogo}
            alt="Description"
            onClick={triggerFileInput}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            style={{ display: "none" }}
            accept="image/*"
          />
          <div className={styles.circleIcon} onClick={triggerFileInput}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.92819 0.513214L8.60331 1.83799L12.1619 5.39627L13.4867 4.07149C14.1711 3.38721 14.1711 2.27867 13.4867 1.59438L12.4082 0.513214C11.7239 -0.171071 10.6153 -0.171071 9.93092 0.513214H9.92819ZM7.98467 2.45658L1.6039 8.83959C1.31921 9.12425 1.11118 9.47735 0.996207 9.86328L0.0271838 13.1561C-0.04125 13.3887 0.0217091 13.6378 0.191425 13.8075C0.361141 13.9772 0.61024 14.0402 0.840177 13.9745L4.13321 13.0055C4.51918 12.8906 4.8723 12.6825 5.15698 12.3979L11.5432 6.01486L7.98467 2.45658Z"
                fill="#999999"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={`${styles.centerDiv} ${styles.companyName}`}>
        <div style={{ width: "250px" }}>
          <Input
            id="CompanyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
          />
        </div>
      </div>

      <div className={`${styles.centerDiv} ${styles.jobTitleContainer}`}>
        <div style={{ width: "250px" }}>
          <Input
            id="JobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job Title*"
          />
        </div>
      </div>

      <div className={`${styles.centerDiv} ${styles.locationContainer}`}>
        <LocationSelector
          label="Choose Location"
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
            placeholder="Job Type"
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
            placeholder="Experience Level"
          />
        </div>
        <div className={`${styles.DropDownContainerDiv}`}>
          <Dropdown
            id="EducationalDegree"
            value={educationalDegree}
            list={educationalDegrees}
            setValue={setEducationalDegree}
            placeholder="Educational Degree"
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

      <div className={`${styles.QuestionsGroup}`}>
   


        <div  className={`${styles.JobQuestions}`}>
        <span className={`${styles.JobQuestionText}`}>Job Question*</span>
        <div>
        {questionDrafts.map((draft) => (
  <QuestionDraft
    key={draft.id}
    id={draft.id}  // Pass the unique ID
    content={draft.content}
    onChange={(updatedContent) => {
      const updatedDrafts = [...questionDrafts];
      const index = updatedDrafts.findIndex(d => d.id === draft.id);
      if (index !== -1) {
        updatedDrafts[index].content = updatedContent;
        setQuestionDrafts(updatedDrafts);
      }
    }}
    onSave={() => handleSaveDraft(draft.id, draft.content)}
    onDelete={() => handleDeleteDraft(draft.id)}  // Delete specific draft by ID
  />
))}
  </div>
      </div>


      </div>

      <div className={`${styles.JobDescription}`}>
        <span className={`${styles.JobDescriptionText}`}>Job Description*</span>
        <div>
          <Draft
            content={description}
            onChange={(content) => setDescription(content)}
          />
        </div>
      </div>

      <div className={`${styles.Continue}`}>
        <Button
          onClick={Review}
          text="Review"
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
