"use client";
import React, { useState } from "react";
import styles from "./Candidates.module.css";
import { useJobApplications } from "@/hooks/useApplicationJob";
import CandidatesCard from "../components/dashboard/CandidatesCard";
import Image from "next/image";
import Draft from "../components/auth/ShowDraft";

const page = () => {
  const { jobApplications } = useJobApplications();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] = useState<any>();

  return (
    <div className={styles.Container}>
      <div className={styles.ListContainer}>
        <div className={styles.TopDetail}>
          <div className={styles.JobsText}>Candidates</div>
          <div className={styles.Options}>Options</div>
        </div>

        <div className={styles.Line}></div>

        <div>
          {jobApplications.appliedJobs.map((item: any, index: any) => {
            return (
              <CandidatesCard
                application={item}
                setShowDetail={setShowDetail}
                setSelectedApplication={setSelectedApplication}
              />
            );
          })}
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

          <div>
            <Draft show content={selectedApplication?.user.profile?.about} />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
