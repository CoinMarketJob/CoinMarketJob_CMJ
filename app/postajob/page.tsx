/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import EditClient from "../components/postajob/EditClient";
import { JSONContent } from "@tiptap/react";
import ReviewClient from "../components/postajob/ReviewClient";
import CheckoutClient from "../components/postajob/CheckoutClient";
import { useRouter } from "next/navigation";

const Page = () => {
  const [page, setPage] = useState<number>(0);

  const router = useRouter();

  const [jobType, setJobType] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [educationalDegree, setEducationalDegree] = useState<string>("");
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [single, setSingle] = useState<string>("");
  const [visa, setVisa] = useState<boolean | undefined>(false);
  const [showSalary, setShowSalary] = useState<boolean>(false);
  const [unitSalary, setUnitSalary] = useState<string>("Year");
  const [questions, setQuestions] = useState<string[]>([]);
  const [description, setDescription] = useState<JSONContent>(JSON);

  const [jobTitle, setJobTitle] = useState<string>("");
  const [locationType, setLocationType] = useState<string>("Remote");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [oneJobIsChecked, setOneJobIsChecked] = useState<boolean>(true);
  const [monthlyChecked, setMonthlyChecked] = useState<boolean>(false);
  const [fiveJobChecked, setFiveJobChecked] = useState<boolean>(false);

  const Complete = async () => {
    try {
      const jobData = {
        PackageType: oneJobIsChecked
          ? "OneJob"
          : monthlyChecked
          ? "Monthly"
          : "FiveJob",
        logo: profile?.logoURL || "",
        companyName: profile?.headline || "",
        jobTitle,
        location: selectedLocations[0],
        jobType,
        experienceLevel,
        educationalDegree,
        visaSponsorship: visa,
        salaryMin: min,
        salaryMax: max,
        jobDescription: description,
        questions: questions,
        showSalary,
        single,
        unitSalary,
        locationType,
      };

      const response = await fetch("/api/job/", {
        method: "POST",
        body: JSON.stringify(jobData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Error Posting for job:", response.statusText);
      }
    } catch (error) {
      console.error("Error in submission process:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/companyprofile/get/");
        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.indicatorContainer}>
        <div
          className={`${styles.indicator} ${styles.indicatorMargin} ${
            page === 0 ? styles.selectedIndicator : ""
          }`}
          onClick={() => setPage(0)} // No restriction for going back to the first page
        ></div>
        <div
          className={`${styles.indicator} ${styles.indicatorMargin} ${
            page === 1 ? styles.selectedIndicator : ""
          }`}
          onClick={() => {
            if (jobTitle && jobType && experienceLevel && educationalDegree) {
              // Only allow advancing if fields are filled
              setPage(1);
            }
          }}
        ></div>
        <div
          className={`${styles.indicator} ${
            page === 2 ? styles.selectedIndicator : ""
          }`}
          onClick={() => {
            if (jobTitle && jobType && experienceLevel && educationalDegree) {
              // Only allow advancing if fields are filled
              setPage(2);
            }
          }}
        ></div>
      </div>

      {page === 0 ? (
        <EditClient
          image={profile?.logoURL || ""}
          companyName={profile?.headline || ""}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          locationType={locationType}
          setLocationType={setLocationType}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          jobType={jobType}
          setJobType={setJobType}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          educationalDegree={educationalDegree}
          setEducationalDegree={setEducationalDegree}
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          unit={unitSalary}
          setUnit={setUnitSalary}
          visa={visa}
          setVisa={setVisa}
          single={single}
          setSingle={setSingle}
          questions={questions}
          setQuestions={setQuestions}
          showSalary={showSalary}
          setShowSalary={setShowSalary}
          description={description}
          setDescription={setDescription}
          setPage={setPage}
        />
      ) : page === 1 ? (
        <ReviewClient
          image={profile?.logoURL || ""}
          companyName={profile?.headline || ""}
          jobTitle={jobTitle}
          selectedLocations={selectedLocations}
          jobType={jobType}
          experienceLevel={experienceLevel}
          educationalDegree={educationalDegree}
          min={min}
          max={max}
          visa={visa}
          description={description}
          setPage={setPage}
          locationType={locationType}
          unit={unitSalary}
          single={single}
          showSalary={showSalary}
          questions={questions}
        />
      ) : (
        <CheckoutClient
          oneJobIsChecked={oneJobIsChecked}
          setOneJobIsChecked={setOneJobIsChecked}
          monthlyChecked={monthlyChecked}
          setMonthlyChecked={setMonthlyChecked}
          fiveJobChecked={fiveJobChecked}
          setFiveJobChecked={setFiveJobChecked}
          Complete={Complete}
        />
      )}
    </div>
  );
};

export default Page;
