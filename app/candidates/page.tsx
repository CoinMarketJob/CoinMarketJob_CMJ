"use client";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./Candidates.module.css";
import { useJobApplications } from "@/hooks/useApplicationJob";
import CandidatesCard from "../components/dashboard/CandidatesCard";
import Image from "next/image";
import ButtonImage from "../components/dashboard/ButtonImage";
import Dropdown from "../components/general/Dropdown";

// Remove the problematic import
// import { Draft } from 'some-draft-library';

// If you need a placeholder for the Draft component, you can create a simple one:
const Draft = ({ show, content }: { show: boolean; content: string }) => (
  <div>{show && <pre>{content}</pre>}</div>
);

const CandidatesPage = () => {
  const { jobApplications } = useJobApplications();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] = useState<any>();
  const [option, setOption] = useState<string>("All");
  const [optionType, setOptionType] = useState<string>("All");
  const [filteredApplications, setFilteredApplications] = useState<any[]>(
    jobApplications.appliedJobs
  );

  const fetchApplications = useCallback(async () => {
    try {
      const response = await fetch(`/api/applicationState/${option}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFilteredApplications(data.length > 0 ? data : []);
        setOptionType(option);
      } else {
        console.error("Error fetching applications:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  }, [option]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications, jobApplications.appliedJobs]);

  const changeState = async (state: string) => {
    if (!selectedApplication) return;

    try {
      const data = {
        jobId: selectedApplication.jobId,
        applicationId: selectedApplication.id,
        state: state,
      };
      const response = await fetch("/api/applicationState/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("State Successfully Changed");
        fetchApplications(); // Refresh the applications after state change
      } else {
        console.error("Error changing application state:", response.statusText);
      }
    } catch (error) {
      console.error("Error changing application state:", error);
    }
  };

  const options = [
    { value: "All", label: "All" },
    { value: "Declined", label: "Declined" },
    { value: "Saved", label: "Saved" },
    { value: "Approved", label: "Approved" },
  ];

  return (
    <div className={styles.Container}>
      <div
        className={`${styles.ListContainer} ${
          !showDetail ? styles.FullWidth : ""
        }`}
      >
        <div className={styles.TopDetail}>
          <div className={styles.JobsText}>Candidates</div>
          <div className={styles.Options}>
            <Dropdown
              id="Options"
              list={options}
              value={option}
              setValue={setOption}
              placeholder="Options"
            />
          </div>
        </div>

        <div className={styles.Line}></div>

        <div>
          {filteredApplications.map((item: any, index: number) => (
            <CandidatesCard
              key={item.id || `application-${index}`}
              application={optionType == "All" ? item : item.appliedJobs}
              setShowDetail={setShowDetail}
              setSelectedApplication={setSelectedApplication}
              showDetail={showDetail}
            />
          ))}
        </div>
      </div>
      {showDetail && (
        <div className={styles.DetailContainer}>
          <div className={styles.ProfilePhoto}>
            <Image
              className={styles.ProfileImage}
              src={
                selectedApplication?.user.profile?.logoURL ||
                "/PlaceHolderAvatar.png"
              }
              width={60}
              height={60}
              alt="Avatar"
            />
          </div>

          <div className={styles.NameSurname}>
            {selectedApplication?.name + " " + selectedApplication?.surname}{" "}
          </div>

          <div className={styles.PhoneNumber}>
            {selectedApplication?.phone}<span className={styles.Dot}>{" - "}</span>{selectedApplication?.email}
          </div>

          <div className={styles.CvCl}>
            {selectedApplication?.resumeLink && (
              <a href={selectedApplication?.resumeLink} className={styles.CvClButton} target="_blank">
                CV
              </a>
            )}

            {selectedApplication?.coverLetterLink && (
              <a href={selectedApplication?.coverLetterLink} className={styles.CvClButton} target="_blank">
                CL
              </a>
            )}
          </div>

          {selectedApplication?.resumeDraft && (
            <div>
              <div className={styles.CvClTitle}>Curriculum Vitae</div>
              <Draft show content={selectedApplication?.resumeDraft} />
            </div>
          )}

          {selectedApplication?.coverLetterDraft && (
            <div>
              <div className={styles.CvClTitle}>Cover Letter</div>
              <Draft show content={selectedApplication?.coverLetterDraft} />
            </div>
          )}

          <div className={styles.QuestionAndAnswerArea}>
            {selectedApplication.Answers.map((item: any, index: number) => (
              <div
                key={item.id || `answer-${index}`}
                className={styles.QuestionAndAnswer}
              >
                <div className={styles.Question}>{item.question.question}</div>
                <div className={styles.Answer}>{item.answer}</div>
              </div>
            ))}
          </div>

          <div className={`${styles.ButtonArea}`}>
            <ButtonImage onClick={() => changeState("Approved")}>
              <svg
                width="25"
                height="17"
                viewBox="0 0 25 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.05651 15.1352L22.9277 0.264017C23.0921 0.0995705 23.286 0.0118544 23.5093 0.000872542C23.7323 -0.00982776 23.9369 0.0778883 24.123 0.264017C24.3094 0.450428 24.4026 0.651339 24.4026 0.866753C24.4026 1.08245 24.3094 1.28336 24.123 1.46949L9.01193 16.5907C8.73879 16.8636 8.42032 17 8.05651 17C7.6927 17 7.37422 16.8636 7.10109 16.5907L0.258521 9.74815C0.0940746 9.5837 0.00804975 9.38828 0.000446904 9.16188C-0.00715595 8.93549 0.0822475 8.72908 0.268658 8.54268C0.454787 8.35655 0.655559 8.26348 0.870973 8.26348C1.08667 8.26348 1.28758 8.35655 1.47371 8.54268L8.05651 15.1352Z"
                  fill="#242220"
                  fill-opacity="0.4"
                />
              </svg>
            </ButtonImage>
            <ButtonImage onClick={() => changeState("Saved")}>
              <svg
                width="14"
                height="17"
                viewBox="0 0 14 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.98154 14.9958L2.71824 16.8258C2.0711 17.1025 1.45628 17.0496 0.873767 16.6668C0.291256 16.2841 0 15.7457 0 15.0517V1.94167C0 1.39908 0.187965 0.939823 0.563894 0.563894C0.939823 0.187965 1.39908 0 1.94167 0H12.0214C12.564 0 13.0233 0.187965 13.3992 0.563894C13.7751 0.939823 13.9631 1.39908 13.9631 1.94167V15.0517C13.9631 15.7457 13.6718 16.2841 13.0893 16.6668C12.5068 17.0496 11.892 17.1025 11.2449 16.8258L6.98154 14.9958ZM6.98154 13.2112L11.8872 15.3242C11.9974 15.3724 12.1024 15.3621 12.2021 15.2933C12.302 15.2244 12.352 15.1314 12.352 15.0143V1.94167C12.352 1.85897 12.3175 1.78325 12.2486 1.71451C12.1798 1.64558 12.1041 1.61113 12.0214 1.61113H1.94167C1.85897 1.61113 1.78325 1.64558 1.71451 1.71451C1.64559 1.78325 1.61113 1.85897 1.61113 1.94167V15.0143C1.61113 15.1314 1.66107 15.2244 1.76096 15.2933C1.86067 15.3621 1.96566 15.3724 2.07593 15.3242L6.98154 13.2112ZM6.98154 1.61113H1.61113H12.352H6.98154Z"
                  fill="#242220"
                  fill-opacity="0.4"
                />
              </svg>
            </ButtonImage>
            <ButtonImage onClick={() => changeState("Declined")}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 9.91181L1.70322 16.7089C1.51765 16.8943 1.28442 16.9892 1.00351 16.9936C0.72282 16.9979 0.485341 16.903 0.291071 16.7089C0.0970236 16.5147 0 16.2793 0 16.0029C0 15.7264 0.0970236 15.4911 0.291071 15.2968L7.08819 8.5L0.291071 1.70322C0.105732 1.51765 0.0108301 1.28442 0.00636411 1.00351C0.00212143 0.722821 0.0970236 0.485341 0.291071 0.291071C0.485341 0.0970236 0.720699 0 0.997143 0C1.27359 0 1.50894 0.0970236 1.70322 0.291071L8.5 7.08819L15.2968 0.291071C15.4823 0.105732 15.7156 0.0108301 15.9965 0.00636411C16.2772 0.00212143 16.5147 0.0970236 16.7089 0.291071C16.903 0.485341 17 0.720699 17 0.997144C17 1.27359 16.903 1.50895 16.7089 1.70322L9.91181 8.5L16.7089 15.2968C16.8943 15.4823 16.9892 15.7156 16.9936 15.9965C16.9979 16.2772 16.903 16.5147 16.7089 16.7089C16.5147 16.903 16.2793 17 16.0029 17C15.7264 17 15.4911 16.903 15.2968 16.7089L8.5 9.91181Z"
                  fill="#242220"
                  fill-opacity="0.4"
                />
              </svg>
            </ButtonImage>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;
