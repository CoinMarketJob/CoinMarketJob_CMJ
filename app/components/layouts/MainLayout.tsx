"use client";
import React, { useEffect, useState } from "react";
import styles from "./MainLayout.module.css";
import { useJobs } from "@/hooks/useJobs";
import { Job } from "@prisma/client";
import ColumnLeft from "./ColumnLeft";
import ColumnRight from "./ColumnRight";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEditor } from "@tiptap/react";
import JobDetails from "../job/JobDetails";

interface MainLayoutProps {
  layout: number;
  filteredJobs: Array<Job>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ filteredJobs, layout }) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [showRightSide, setShowRightSide] = useState<boolean>(false);

  const [leftCards, setLeftCards] = useState<Array<Job>>([]);
  const [rightCards, setRightCards] = useState<Array<Job>>([]);

  useEffect(() => {
    setLeftCards(filteredJobs);
  }, [filteredJobs]);

  const handleDrop = (id: number, list: string) => {
    if (list === "left") {
      setLeftCards((prev) => [
        ...prev,
        ...rightCards.filter((card) => card.id === id),
      ]);
      setRightCards((prev) => prev.filter((card) => card.id !== id));
    } else {
      setRightCards((prev) => [
        ...prev,
        ...leftCards.filter((card) => card.id === id),
      ]);
      setLeftCards((prev) => prev.filter((card) => card.id !== id));
    }
  };

  const onClick = (job: Job) => {
    setShowDetail(true);
    setDetailJob(job);
    setShowRightSide(false);
  };

  const onDragBegin = () => {
    setShowRightSide(true);
    setShowDetail(false);
    setDetailJob(null);
  };

  const onDragEnd = () => {
    console.log("Test");
    setShowRightSide(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.JobCardArea}>
          <ColumnLeft
            layout={layout}
            onDragEnd={onDragEnd}
            onDragBegin={onDragBegin}
            onClick={onClick}
            list="left"
            cards={leftCards}
            onDrop={handleDrop}
          />
        </div>

        {showDetail && (
          <div className={styles.DetailArea}>
            <JobDetails job={detailJob} />
          </div>
        )}

        {showRightSide && (
          <div className={styles.DetailArea}>
            <ColumnRight list="right" cards={rightCards} onDrop={handleDrop} />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default MainLayout;
