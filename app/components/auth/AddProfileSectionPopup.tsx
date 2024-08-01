"use client";
import React, { useEffect, useState } from "react";
import styles from "./AddProfileSectionPopup.module.css";
import Icon from "../general/Icon";
import Input from "../general/Input";
import Dropdown from "../general/Dropdown";

interface PopupProps {
  type: string;
  setShowAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProfileSectionPopup: React.FC<PopupProps> = ({
  type,
  setShowAddPopup,
}) => {
  const [titlePlace, setTitlePlace] = useState<string>("Title*");
  const [title, setTitle] = useState<string>("");

  const [institutionPlace, setInstitutionPlace] = useState<string>("Company*");
  const [institution, setInstitution] = useState<string>("");

  const [location, setLocation] = useState<string>("");
  const [locationShow, setLocationShow] = useState<boolean>(false);

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [fromToShow, setFromToShow] = useState<boolean>();

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
      type == "Work Experience"
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
      type == "Work Experience" || type == "Volunteering" || type == "Education"
    );

    setFromToShow(
      type == "Work Experience" ||
        type == "Volunteering" ||
        type == "Education" ||
        type == "Publications"
    );
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.TopInfo}>
        <div className={styles.ExText}>{type}</div>
        <div className={styles.CloseIcon}>
          <Icon onClick={() => setShowAddPopup(false)}>
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

      {fromToShow && (
        <div className={styles.Row} style={{display: "flex"}}>
          <div className={styles.FirstColumn}>
            <Dropdown
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              list={dateList}
            />
          </div>
          
          <div className={styles.SecondColumn}>
            <Dropdown
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              list={dateList}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProfileSectionPopup;
