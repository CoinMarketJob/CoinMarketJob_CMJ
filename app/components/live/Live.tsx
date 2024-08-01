"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Live.module.css";
import Search from "./Search";
import Categories from "./Categories";

// Define the type for live and blog items
interface LiveItem {
  liveType: string;
  title: string;
  organisation?: string;
  headline?: string;
  content?: string;
  // Add other properties based on your data structure
}

const Live: React.FC = () => {
  // Use the defined type for state
  const [live, setLive] = useState<LiveItem[]>([]);
  const [blog, setBlog] = useState<LiveItem[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  let globalIndex = 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetchData() {
      try {
        const response = await fetch("/api/live/");
        const data: LiveItem[] = await response.json(); // Assert type
        console.log(data);
        setLive(data.filter((x) => x.liveType !== "BLOG"));
        setBlog(data.filter((x) => x.liveType === "BLOG"));
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    }

    fetchData();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getAlternatingRows = () => {
    const combined: JSX.Element[] = [];
    let liveIndex = 0;
    let blogIndex = 0; // Total index to uniquely identify each element

    while (liveIndex < live.length || blogIndex < blog.length) {
      // Add 2 live items
      for (let i = 0; i < 2 && liveIndex < live.length; i++, liveIndex++, globalIndex++) {
        const isExpanded = expandedIndex === globalIndex;
        const index = globalIndex;
        combined.push(
          <div key={`live-${liveIndex}`} className={styles.liveItem} onClick={() => toggleExpand(index)}>
            <div className={styles.DetailArrow}>
              <motion.svg
                width="19"
                height="10"
                viewBox="0 0 19 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M9.29366 10C9.09763 10 8.91677 9.96799 8.75108 9.90396C8.58539 9.83962 8.42304 9.7281 8.26403 9.56939L0.274133 1.57904C0.10359 1.4088 0.0125526 1.19987 0.00102115 0.95225C-0.0108137 0.704932 0.0802237 0.484469 0.274133 0.290862C0.467739 0.0969527 0.682436 0 0.918223 0C1.15401 0 1.36871 0.0969527 1.56231 0.290862L9.29366 8.02176L17.025 0.290862C17.1953 0.120319 17.4042 0.0292816 17.6518 0.0177502C17.8991 0.00591532 18.1196 0.0969527 18.3132 0.290862C18.5071 0.484469 18.6041 0.699166 18.6041 0.934953C18.6041 1.17074 18.5071 1.38544 18.3132 1.57904L10.3233 9.56939C10.1643 9.7281 10.0019 9.83962 9.83625 9.90396C9.67056 9.96799 9.4897 10 9.29366 10Z"
                  fill="#999999"
                />
              </motion.svg>
            </div>
            {live[liveIndex].liveType === "News" ? (
              <>
                <div className={styles.Title}>{live[liveIndex].title}</div>
                <div className={styles.Type}>News</div>
              </>
            ) : (
              <>
                <div className={styles.Title}>{live[liveIndex].title} by</div>
                <div className={styles.Organisation}>{live[liveIndex].organisation}</div>
                <div className={styles.Headline}>{live[liveIndex].headline}</div>
                <div className={styles.Type}>Event Hackathon</div>
              </>
            )}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className={styles.Details}
              >
                <div className={styles.NewsDetails}>{live[liveIndex].content}</div>
              </motion.div>
            )}
          </div>
        );
      }

      // Add 10 blog items in 2 rows of 5
      for (let i = 0; i < 2 && blogIndex < blog.length; i++) {
        const rowItems = [];
        for (let j = 0; j < 5 && blogIndex < blog.length; j++, blogIndex++, globalIndex++) {
          rowItems.push(
            <div key={`blog-${blogIndex}`} className={`${styles.blogItem} ${i % 2 === 0 ? styles.scrollLeft : styles.scrollRight}`}>
              <div className={styles.blogTitle}>{blog[blogIndex].title}</div>
              <div className={styles.blogArrow}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5942 1.70775L0.82875 11.4537C0.73525 11.5474 0.6205 11.591 0.4845 11.5845C0.348666 11.5782 0.233917 11.5282 0.14025 11.4345C0.04675 11.341 0 11.2295 0 11.1C0 10.9705 0.04675 10.859 0.14025 10.7655L9.8865 1H3.5C3.35833 1 3.23958 0.952 3.14375 0.856C3.04792 0.76 3 0.641083 3 0.499249C3 0.357416 3.04792 0.23875 3.14375 0.14325C3.23958 0.0477495 3.35833 0 3.5 0H10.7865C11.0153 0 11.2072 0.0774161 11.362 0.232249C11.5168 0.387083 11.5942 0.578917 11.5942 0.80775V7.5C11.5942 7.64167 11.5463 7.76042 11.4503 7.85625C11.3543 7.95208 11.2353 8 11.0935 8C10.9517 8 10.833 7.95208 10.7375 7.85625C10.642 7.76042 10.5942 7.64167 10.5942 7.5V1.70775Z" fill="#999999" />
                </svg>
              </div>
            </div>
          );
        }
        combined.push(
          <div key={`blog-row-${i}-${blogIndex}`} className={styles.blogRow}>
            {rowItems}
          </div>
        );
      }
    }

    return combined;
  };

  return (
    <div>
      <Search />
      <Categories />
      <div className={styles.LiveContainer}>{getAlternatingRows()}</div>
    </div>
  );
};

export default Live;
