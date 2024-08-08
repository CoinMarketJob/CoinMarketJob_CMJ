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

interface MainLayoutProps {
  layout: number;
  filteredJobs: Array<Job>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ filteredJobs, layout }) => {
  const [showDetail, setShowDetail] = useState<boolean>(true);

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.JobCardArea}>
          <ColumnLeft list="left" cards={leftCards} onDrop={handleDrop} />
        </div>

        {showDetail && (
          <div className={styles.DetailArea}>
            <ColumnRight list="right" cards={rightCards} onDrop={handleDrop} />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default MainLayout;
