"use client";
import React, { useEffect, useState } from "react";
import styles from "./MainLayout.module.css";
import { Job } from "@prisma/client";
import ColumnLeft from "./ColumnLeft";
import ColumnRight from "./ColumnRight";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import JobDetails from "../job/JobDetails";
import { useLayout } from "@/hooks/useLayout";

interface MainLayoutProps {
  layout: number;
  filteredJobs: Array<Job>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ filteredJobs, layout }) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showDetailInRightSide, setShowDetailInRightSide] =
    useState<boolean>(false);
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [showRightSide, setShowRightSide] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [leftCards, setLeftCards] = useState<Array<Job>>([]);
  const [rightCards, setRightCards] = useState<Array<Job>>([]);
  const [hasRightItems, setHasRightItems] = useState<boolean>(false);

  useEffect(() => {
    setLeftCards(filteredJobs);
  }, [filteredJobs]);

  const handleDrop = (id: number, list: string) => {
    if (list === "left") {
      const movedCard = rightCards.find((card) => card.id === id);
      console.log("Moved Card: ", movedCard);
      if (movedCard) {
        setLeftCards((prev) => [...prev, movedCard]);
        const newRightCards = rightCards.filter((card) => card.id !== id);
        setRightCards(newRightCards);
        setHasRightItems(newRightCards.length > 0);
      }
    } else {
      const movedCard = leftCards.find((card) => card.id === id);
      console.log("Moved Card: ", movedCard);
      if (movedCard) {
        setRightCards((prev) => [...prev, movedCard]);
        setLeftCards((prev) => prev.filter((card) => card.id !== id));
        setHasRightItems(true);
      }
    }
  };

  const onClick = (job: Job) => {
    console.log(showRightSide);
    setShowDetail(showRightSide ? false : true);
    setDetailJob(job);
    setShowRightSide(showRightSide ? true : false);
    setShowDetailInRightSide(showRightSide ? true : false);
    setIsDragging(true);
  };

  const onDragBegin = () => {
    setShowDetailInRightSide(
      showDetail ? true : showDetailInRightSide ? true : false
    );
    setShowDetail(false);
    setShowRightSide(true);
    setIsDragging(true);
  };

  const onDragEnd = () => {
    setShowRightSide(false);
    setIsDragging(false);
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
            isDragging={isDragging}
          />
        </div>

        {showDetail && (
          <div className={`${styles.DetailArea} ${styles.JobDetailArea}`}>
            <JobDetails job={detailJob} />
          </div>
        )}

        {(isDragging || hasRightItems) && (
          <div className={styles.DetailArea}>
            <ColumnRight
              list="right"
              cards={rightCards}
              onDrop={handleDrop}
              detailJob={detailJob}
              setDetailJob={setDetailJob}
              showDetail={showDetailInRightSide}
              setShowDetail={setShowDetailInRightSide}
              setRightCards={setRightCards}
              rightCards={rightCards}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default MainLayout;
