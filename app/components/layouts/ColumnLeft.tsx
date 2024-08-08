import React from "react";
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
}

const ColumnLeft: React.FC<ColumnProps> = ({
  layout,
  list,
  cards,
  onDrop,
  onClick,
  onDragBegin,
  onDragEnd,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () => ({ list }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`${styles.columnLeft} ${layout == 0 ? styles.gridContainer : ""}`}>
      {cards.map((card) => (
        <>
          {layout == 1 ? (
            <JobCard
              onDragEnd={onDragEnd}
              onDragBegin={onDragBegin}
              job={card}
              onClick={onClick}
              onDrop={onDrop}
            />
          ) : layout == 2 ? (
            <Cozy
              onDragEnd={onDragEnd}
              onDragBegin={onDragBegin}
              job={card}
              onClick={onClick}
              onDrop={onDrop}
            />
          ) : layout == 3 ? (
            <Compact
              onDragEnd={onDragEnd}
              onDragBegin={onDragBegin}
              job={card}
              onClick={onClick}
              onDrop={onDrop}
            />
          ) : (
            <Grid
              onDragEnd={onDragEnd}
              onDragBegin={onDragBegin}
              job={card}
              onClick={onClick}
              onDrop={onDrop}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default ColumnLeft;
