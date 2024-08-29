"use client";
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import JobCard from "../components/dashboard/JobCard";

const page = () => {
    const [loading, setLoading] = useState<boolean>();
    const [jobs, setJobs] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard/get/");
        const data = await response.json();
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.JobsText}>Jobs</div>
      <div className={styles.Line}></div>

      <div>
        <JobCard />
      </div>
    </div>
  );
};

export default page;
