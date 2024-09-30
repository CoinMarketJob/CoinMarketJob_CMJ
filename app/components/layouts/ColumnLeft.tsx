"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import JobCard from "../job/Basic/JobCard";
import { Job } from "@prisma/client";
import styles from "./Column.module.css";
import Compact from "../job/Compact/JobCard";
import Cozy from "../job/Cozy/JobCard";
import Grid from "../job/Grid/JobCard";

const ItemTypes = {
  CARD: "card",
};

interface ColumnProps {
  layout: number;
  list: string;
  cards: Array<Job>;
  onDrop: (id: number, list: string) => void;
  onClick: (job: Job) => void;
  onDragBegin: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
  selectedJob?: number | null;
  selectedJobId: number | null;
  setSelectedJobId: (id: number | null) => void;
}

const ColumnLeft: React.FC<ColumnProps> = ({
  layout,
  list,
  cards,
  onDrop,
  onClick,
  onDragBegin,
  onDragEnd,
  isDragging,
  selectedJob,
  selectedJobId,
  setSelectedJobId
}) => {


  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () => ({ list }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (selectedJob) {
      setSelectedJobId(selectedJob);
    }
  }, [selectedJob]);


  const dragRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      drop(node);
    }
  }, [drop]);

  return (
    <div ref={dragRef} className={`${styles.columnLeft} ${layout == 0 ? styles.gridContainer : ""} ${layout == 0 && isDragging ? styles.dragging : ""}`}>
      {cards.map((card) => (
        <>
          {layout == 1 ? (
            <JobCard
              job={card}
              key={card.id}
              onClick={onClick}
              isSelected={selectedJobId === card.id}
              onSelect={setSelectedJobId}
            />
          ) : layout == 2 ? (
            <Cozy
              job={card}
              onClick={onClick}
              isSelected={selectedJobId === card.id}
              onSelect={setSelectedJobId}
            />
          ) : layout == 3 ? (
            <Compact
              job={card}
              onClick={onClick}
            />
          ) : (
            <Grid
              job={card}
              onClick={onClick}
              isSelected={selectedJobId === card.id}
              onSelect={setSelectedJobId}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default ColumnLeft;
