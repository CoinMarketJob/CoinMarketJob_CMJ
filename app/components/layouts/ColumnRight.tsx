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
}

const ColumnRight: React.FC<ColumnProps> = ({ list, cards, onDrop }) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [detailJob, setDetailJob] = useState<Job | null>(null);
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

  const dragRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      drop(node);
    }
  }, [drop]);

  return (
    <div
      ref={dragRef}
      className={`${styles.column} ${isOver ? styles.highlight : ""}`}
    >
      {showDetail && (
        <div className={styles.DetailArea}>
          <JobDetails job={detailJob} />
        </div>
      )}

      {cards.map((card) => (
        <SelectedJobCard
          job={card}
          onClick={onClick}
          key={card.id}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default ColumnRight;
