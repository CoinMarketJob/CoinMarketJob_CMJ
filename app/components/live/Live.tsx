import React, { useEffect, useState, useRef } from "react";
import styles from "./Live.module.css";
import Search from "./Search";
import Categories from "./Categories";
import { motion, AnimatePresence } from "framer-motion";

interface LiveItem {
  liveType: string;
  title: string;
  organisation?: string;
  headline?: string;
  content?: string;
  author?: string;
  date?: string;
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
      filteredItems = filteredItems.filter(item => {
        if (category === "Hackathon") {
          return item.liveType === "HACKHATHONS";
        }
        return item.liveType === category;
      });
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

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
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
            <div className={styles.Title}>
              {items[liveIndex].title}
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.04, 0.62, 0.23, 0.98],
                    scale: { duration: 0.3 }
                  }}
                  className={styles.Details}
                >
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className={styles.NewsDetails}
                  >
                    {items[liveIndex].content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={styles.NewsMetadata}>
              {items[liveIndex].author && <span className={styles.Author}>By {items[liveIndex].author}</span>}
              {items[liveIndex].date && <span className={styles.Date}>{formatDate(items[liveIndex].date)}</span>}
            </div>
            <div className={styles.Type}>{items[liveIndex].liveType}</div>
          </div>
        );
      }

      for (let i = 0; i < 2; i++) {
        const rowItems = [];
        for (let j = 0; j < 10; j++, blogIndex++, globalIndex++) { // 20'den 10'a düşürüldü
          if (blogIndex >= blog.length) {
            blogIndex = 0;
          }
          rowItems.push(
            <div
              key={`blog-${blogIndex}-${j}`}
              className={`${styles.blogItem}`}
            >
              <div className={styles.blogTitle}>{blog[blogIndex]?.title}</div>
              <div className={styles.blogArrow}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5942 1.70775L0.82875 11.4537C0.73525 11.5474 0.6205 11.591 0.4845 11.5845C0.348666 11.5782 0.233917 11.5282 0.14025 11.4345C0.04675 11.341 0 11.2295 0 11.1C0 10.9705 0.04675 10.859 0.14025 10.7655L9.8865 1H3.5C3.35833 1 3.23958 0.952 3.14375 0.856C3.04792 0.76 3 0.641083 3 0.499249C3 0.357416 3.04792 0.23875 3.14375 0.14325C3.23958 0.0477495 3.35833 0 3.5 0H10.7865C11.0153 0 11.2072 0.0774161 11.362 0.232249C11.5168 0.387083 11.5942 0.578917 11.5942 0.80775V7.5C11.5942 7.64167 11.5463 7.76042 11.4503 7.85625C11.3543 7.95208 11.2353 8 11.0935 8C10.9517 8 10.833 7.95208 10.7375 7.85625C10.642 7.76042 10.5942 7.64167 10.5942 7.5V1.70775Z"
                    fill="#999999"
                  />
                </svg>
              </div>
            </div>
          );
        }
        combined.push(
          <div 
            key={`blog-row-${globalIndex}`} 
            className={`${styles.blogRow} ${i % 2 === 0 ? styles.scrollLeft : styles.scrollRight}`}
          >
            {rowItems}
            {rowItems}
            {rowItems} {/* Eklenen üçüncü kopya */}
          </div>
        );
      }
    }

    return combined;
  };

  return (
    <div className={styles.LiveContainer}>
      <Search keyword={keyword} ChangeFunction={ChangeFunction} handleKeyDown={handleKeyDown} />
      <Categories onCategoryClick={handleCategoryClick} />
      <div className={styles.Content}>
        {getAlternatingRows(filteredLive.map(item => ({
          ...item,
          date: item.date ? new Date(item.date).toLocaleDateString() : undefined
        })))}
      </div>
    </div>
  );
};

export default Live;