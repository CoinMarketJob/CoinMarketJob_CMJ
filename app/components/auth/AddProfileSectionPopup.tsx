"use client";
import React, { useEffect, useState } from "react";
import styles from "./AddProfileSectionPopup.module.css";
import Icon from "../general/Icon";
import Input from "../general/Input";
import Dropdown from "../general/Dropdown";
import EditProfileDraft from "./EditProfileDraft";
import { JSONContent } from "@tiptap/react";
import Button from "../general/Button";
import { ProfileSection, SectionType } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

interface PopupProps {
  type: string;
  profileId: number;
  setShowAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (newSection: ProfileSection) => void;
  onUpdate: (updatedSection: ProfileSection) => void;
  editingSection?: ProfileSection;
}

const AddProfileSectionPopup: React.FC<PopupProps> = ({
  type,
  setShowAddPopup,
  profileId,
  onAdd,
  onUpdate,
  editingSection,
}) => {
  const [titlePlace, setTitlePlace] = useState<string>("Title*");
  const [title, setTitle] = useState<string>("");

  const [institutionPlace, setInstitutionPlace] = useState<string>("Company*");
  const [institution, setInstitution] = useState<string>("");

  const [location, setLocation] = useState<string>("");
  const [locationShow, setLocationShow] = useState<boolean>(false);

  const [from, setFrom] = useState<string>("");
  const [fromPlace, setFromPlace] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [toPlace, setToPlace] = useState<string>("");

  const [fromShow, setFromShow] = useState<boolean>();
  const [toShow, setToShow] = useState<boolean>();

  const [url, setUrl] = useState<string>();
  const [description, setDescription] = useState<JSONContent | null>();

  const dateList = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" },
    { value: "2013", label: "2013" },
    { value: "2012", label: "2012" },
    { value: "2011", label: "2011" },
    { value: "2010", label: "2010" },
    { value: "2009", label: "2009" },
    { value: "2008", label: "2008" },
  ];

  useEffect(() => {
    setTitlePlace(
      type == "Education"
        ? "Degree or License*"
        : type == "Certifications"
        ? "Name*"
        : "Title*"
    );

    setInstitutionPlace(
      type == "WorkExperience"
        ? "Company*"
        : type == "Education"
        ? "Institution*"
        : type == "Projects"
        ? "Clients*"
        : type == "Publications"
        ? "Publisher"
        : type == "Publications"
        ? "Issuer*"
        : "Organization*"
    );

    setLocationShow(
      type == "WorkExperience" || type == "Volunteering" || type == "Education"
    );

    setFromShow(
      type == "WorkExperience" ||
        type == "Volunteering" ||
        type == "Education" ||
        type == "Publications" ||
        type == "Certifications" ||
        type == "Awards" ||
        type == "Projects"
    );
    setToShow(
      type == "WorkExperience" ||
        type == "Volunteering" ||
        type == "Education" ||
        type == "Publications" ||
        type == "Certifications" ||
        type == "Awards"
    );
    setFromPlace(
      type == "Certifications"
        ? "Issued*"
        : type == "Publications" || type == "Awards"
        ? "Month*"
        : type == "Projects"
        ? "Year*"
        : "From*"
    );

    setToPlace(
      type == "Certifications"
        ? "Expires*"
        : type == "Publications" || type == "Awards"
        ? "Year*"
        : "To*"
    );
  }, [type]);

  useEffect(() => {
    if (editingSection) {
      setTitle(editingSection.title || "");
      setInstitution(editingSection.institution || "");
      setLocation(editingSection.location || "");
      setFrom(editingSection.from || "");
      setTo(editingSection.to || "");
      // Remove the setUrl line as 'url' property doesn't exist on editingSection
      setDescription(editingSection.description ? 
        (typeof editingSection.description === 'string' ? 
          JSON.parse(editingSection.description) : 
          editingSection.description
        ) : 
        null
      );
    }
  }, [editingSection]);

  const Cancel = () => {
    setShowAddPopup(false);
  };

  const Save = () => {
    const sectionData = {
      id: editingSection?.id ?? 0, // Add this line
      profileId,
      sectionType: type as SectionType, // Cast to SectionType
      title: title || null,
      from: from || null,
      to: to || null,
      institution: institution || null,
      location: location || null,
      url: url || null,
      description: description as JsonValue, // Cast description to JsonValue
    };
    if (editingSection) {
      onUpdate({
        ...sectionData,
        title: sectionData.title || '',
        from: sectionData.from || '',
        to: sectionData.to || '',
        institution: sectionData.institution || '',
        location: sectionData.location || '',
      });
    } else {
      onAdd({
        ...sectionData,
        title: sectionData.title || '',
        from: sectionData.from || '',
        to: sectionData.to || '',
        institution: sectionData.institution || '',
        location: sectionData.location || '',
      });
    }
    setShowAddPopup(false);
    setTitle("");
    setInstitution("");
    setFrom("");
    setTo("");
    setUrl("");
    setDescription(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.TopInfo}>
        <div className={styles.ExText}>{type == "WorkExperience" ? "Work Experience" : type}</div>
        <div className={styles.CloseIcon}>
          <Icon onClick={() => setShowAddPopup(false)} hoverSize={40}>
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
                fill-opacity="0.2"
                className="svg-icon"
              />
            </svg>
          </Icon>
        </div>
      </div>

      <div className={styles.Line}></div>

      <div className={styles.Row}>
        <Input
          id="title"
          placeholder={titlePlace}
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.Row}>
        <Input
          id="institution"
          placeholder={institutionPlace}
          type="text"
          required
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
        />
      </div>
      {locationShow && (
        <div className={styles.Row}>
          <Input
            id="location"
            placeholder="Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      )}

      <div className={styles.Row} style={{ display: "flex" }}>
        {fromShow && (
          <div className={styles.FirstColumn}>
            <Dropdown
              id="from"
              value={from}
              setValue={setFrom}
              list={dateList}
              placeholder={fromPlace}
            />
          </div>
        )}

        {toShow && (
          <div className={styles.SecondColumn}>
            <Dropdown
              id="to"
              value={to}
              setValue={setTo}
              list={dateList}
              placeholder={toPlace}
            />
          </div>
        )}
      </div>

      <div className={styles.Row}>
        <Input
          id="url"
          placeholder="URL*"
          type="text"
          value={url || ''}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className={styles.Row}>
        <EditProfileDraft
          ContentType="About"
          content={description || undefined}
          onChange={(content: JSONContent) => setDescription(content)}
        />
      </div>

      <div className={styles.ButtonGroup}>
        <Button
          text="Cancel"
          onClick={Cancel}
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
      <div className={styles.Row}></div>
    </div>
  );
};

export default AddProfileSectionPopup;
