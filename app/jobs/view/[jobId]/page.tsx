"use client";
import MainLayout from "@/app/components/layouts/MainLayout";
import { useJobs } from "@/hooks/useJobs";
import { useLayout } from "@/hooks/useLayout";
import React, { useEffect } from "react";

type JobProps = {
  jobId: string;
};

const Page = ({ params }: { params: JobProps }) => {
  const { jobs, setJobs, filteredJobs, setFilteredJobs } = useJobs();

  const { layout } = useLayout();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/job/get");
        const data = await response.json();
        console.log(data);
        setJobs(data);
        setFilteredJobs(data);
        console.log(layout);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    }

    fetchData();
  }, [setJobs, setFilteredJobs]);

  return (
    <div style={{ width: "100%" }}>
      <MainLayout filteredJobs={filteredJobs} layout={layout} selectedJobId={params.jobId} />
    </div>
  );
};

export default Page;
