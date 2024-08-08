import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Live.module.css";
import Search from "./Search";
import Categories from "./Categories";

interface LiveItem {
  liveType: string;
  title: string;
  organisation?: string;
  headline?: string;
  content?: string;
}

const Live: React.FC = () => {
  const [live, setLive] = useState<LiveItem[]>([]);
  const [filteredLive, setFilteredLive] = useState<LiveItem[]>([]);
  const [blog, setBlog] = useState<LiveItem[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  let globalIndex = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/live/");
        const data: LiveItem[] = await response.json();
        setLive(data.filter((x) => x.liveType !== "BLOG"));
        setFilteredLive(data.filter((x) => x.liveType !== "BLOG"));
        setBlog(data.filter((x) => x.liveType === "BLOG"));
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    }

    fetchData();
  }, []);

  const ChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    applyFilters(e.target.value, selectedCategory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyFilters(keyword, selectedCategory);
    }
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    applyFilters(keyword, newCategory);
  };

  const applyFilters = (keyword: string, category: string | null) => {
    const lowerCaseKeyword = keyword.toLowerCase();
    let filteredItems = live;

    if (category) {
      filteredItems = filteredItems.filter(item => item.liveType === category);
    }

    if (lowerCaseKeyword) {
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(lowerCaseKeyword)
      );
    }

    setFilteredLive(filteredItems);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getAlternatingRows = (items: LiveItem[]) => {
    const combined: JSX.Element[] = [];
    let liveIndex = 0;
    let blogIndex = 0;

    while (liveIndex < items.length || blogIndex < blog.length) {
      for (let i = 0; i < 2 && liveIndex < items.length; i++, liveIndex++, globalIndex++) {
        const isExpanded = expandedIndex === globalIndex;
        const index = globalIndex;
        combined.push(
          <div
            key={`live-${liveIndex}`}
            className={styles.liveItem}
            onClick={() => toggleExpand(index)}
          >
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
            {items[liveIndex].liveType === "News" ? (
              <>
                <div className={styles.Title}>
                  {items[liveIndex].title}
                </div>
                <div className={styles.Type}>News</div>
              </>
            ) : (
              <>
                <div className={styles.Title}>
                  {items[liveIndex].title} by
                </div>
                <div className={styles.Organisation}>
                  {items[liveIndex].organisation}
                </div>
                <div className={styles.Headline}>
                  {items[liveIndex].headline}
                </div>
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
                <div className={styles.NewsDetails}>
                  {items[liveIndex].content}
                </div>
              </motion.div>
            )}
          </div>
        );
      }

      for (let i = 0; i < 2 && blogIndex < blog.length; i++) {
        const rowItems = [];
        for (let j = 0; j < 5 && blogIndex < blog.length; j++, blogIndex++, globalIndex++) {
          rowItems.push(
            <div
              key={`blog-${blogIndex}`}
              className={`${styles.blogItem} ${
                i % 2 === 0 ? styles.scrollLeft : styles.scrollRight
              }`}
            >
              <div className={styles.blogTitle}>{blog[blogIndex].title}</div>
              <div className={styles.blogArrow}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0L12 4.5L7.5 9L6.75 8.25L10.5 4.5L6.75 0.75L7.5 0Z"
                    fill="#999999"
                  />
                </svg>
              </div>
            </div>
          );
        }
        combined.push(
          <div key={`blog-row-${globalIndex}`} className={styles.blogRow}>
            {rowItems}
          </div>
        );
      }
    }

    return combined;
  };

  return (
    <div className={styles.Container}>
      <Search keyword={keyword} ChangeFunction={ChangeFunction} handleKeyDown={handleKeyDown} />
      <Categories onCategoryClick={handleCategoryClick} />
      <div className={styles.Content}>{getAlternatingRows(filteredLive)}</div>
    </div>
  );
};

export default Live;
