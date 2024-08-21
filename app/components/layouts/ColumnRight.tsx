"use client";
import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Job } from "@prisma/client";
import styles from "./Column.module.css";
import SelectedJobCard from "./SelectedJobCard";
import JobDetails from "../job/JobDetails";

const ItemTypes = {
  CARD: "card",
};

interface ColumnProps {
  list: string;
  cards: Array<Job>;
  onDrop: (id: number, list: string) => void;
  detailJob: Job | null;
  setDetailJob: React.Dispatch<React.SetStateAction<Job | null>>;
  showDetail: boolean;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnRight: React.FC<ColumnProps> = ({ list, cards, onDrop, detailJob, setDetailJob, showDetail, setShowDetail }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () => ({ list }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const onClick = (job: Job) => {
    setShowDetail(true);
    setDetailJob(job);
  };

  const dragRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        drop(node);
      }
    },
    [drop]
  );

  return (
    <div
      ref={dragRef}
      className={`${styles.column} ${isOver ? styles.highlight : ""}`}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {showDetail && (
        <div className={styles.DetailArea}>
          <JobDetails job={detailJob} />
        </div>
      )}

      <div className={`${styles.SelectedJobCardContainer} ${showDetail ? styles.selectedJobCardContainerWithDetail : ''}`} style={{ flex: showDetail ? 'none' : 1 }}>
        {cards.map((card) => (
          <SelectedJobCard
            job={card}
            onClick={onClick}
            key={card.id}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default ColumnRight;
