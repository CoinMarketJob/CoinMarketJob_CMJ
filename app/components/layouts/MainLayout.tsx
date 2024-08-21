"use client";
import React, { useEffect, useState } from "react";
import styles from "./MainLayout.module.css";
import { Job } from "@prisma/client";
import ColumnLeft from "./ColumnLeft";
import ColumnRight from "./ColumnRight";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import JobDetails from "../job/JobDetails";

interface MainLayoutProps {
  layout: number;
  filteredJobs: Array<Job>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ filteredJobs, layout }) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showDetailInRightSide, setShowDetailInRightSide] = useState<boolean>(false);
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [showRightSide, setShowRightSide] = useState<boolean>(false);

  const [leftCards, setLeftCards] = useState<Array<Job>>([]);
  const [rightCards, setRightCards] = useState<Array<Job>>([]);

  useEffect(() => {
    setLeftCards(filteredJobs);
  }, [filteredJobs]);

  const handleDrop = (id: number, list: string) => {

    if (list === "left") {
      const movedCard = rightCards.find((card) => card.id === id);
      console.log("Moved Card: ", movedCard);
      if (movedCard) {
        setLeftCards((prev) => [...prev, movedCard]);
        setRightCards((prev) => prev.filter((card) => card.id !== id));
      }
    } else {
      const movedCard = leftCards.find((card) => card.id === id);
      console.log("Moved Card: ", movedCard);
      if (movedCard) {
        setRightCards((prev) => [...prev, movedCard]);
        setLeftCards((prev) => prev.filter((card) => card.id !== id));
      }
    }
  };

  const onClick = (job: Job) => {
    console.log(showRightSide);
    setShowDetail(showRightSide ? false : true);
    setDetailJob(job);
    setShowRightSide(showRightSide ? true : false);
    setShowDetailInRightSide(showRightSide ? false : true);
  };

  const onDragBegin = () => {
    setShowDetailInRightSide(showDetail ? true : showDetailInRightSide ? true : false);
    setShowDetail(false);
    setShowRightSide(true);
  };

  const onDragEnd = () => {
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
          <div className={`${styles.DetailArea} ${styles.JobDetailArea}`}>
            <JobDetails job={detailJob} />
          </div>
        )}

        {showRightSide && (
          <div className={styles.DetailArea}>
            <ColumnRight
              list="right"
              cards={rightCards}
              onDrop={handleDrop}
              detailJob={detailJob}
              setDetailJob={setDetailJob}
              showDetail={showDetailInRightSide}
              setShowDetail={setShowDetailInRightSide}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default MainLayout;
