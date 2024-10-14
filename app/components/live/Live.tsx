import React, { useEffect, useRef, useState } from "react";
import styles from "./Live.module.css";
import Search from "./Search";
import Categories from "./Categories";
import Icon from "../general/Icon";

interface LiveItem {
  id: number;
  liveType: string;
  title: string;
  organisation?: string;
  headline?: string;
  content?: string;
  author?: string;
  date?: string;
  
  location: string;
  prizePool: string;
  participants: number;
  url: string;
}

interface LiveProps {
  initialExpandedId?: number | null;
}

interface HackathonCardProps {
  name: string;
  organizer: string;
  date: string;
  location: string;
  prizePool: string;
  participants: number;
  url: string;
}

const HackathonCard: React.FC<HackathonCardProps> = ({
  name,
  organizer,
  date,
  location,
  prizePool,
  participants,
  url,
}) => {
  console.log(date);
  return (
    <div className={styles.hackathonCard}>
      <div className={styles.hackathonCardHeader}>
        <div className={styles.hackathonCardHeaderTop}>
          <div>
            <div className={styles.hackathonCardTitle}>{name}</div>
            <div className={styles.hackathonCardOrganizer}>By {organizer}</div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.hackathonCardExternalLink}
            aria-label="Go to Hackathon Page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
      <div className={styles.hackathonCardContent}>
        <div className={styles.hackathonCardGrid}>
          <div>Date: {date}</div>
          <div>Location: {location}</div>
          <div>Prize Pool: {prizePool}</div>
          <div>Participants: {participants}</div>
        </div>
      </div>
      <div className={styles.hackathonCardOverlay} aria-hidden="true" />
    </div>
  );
};

const Live: React.FC<LiveProps> = ({ initialExpandedId }) => {
  const [live, setLive] = useState<LiveItem[]>([]);
  const [filteredLive, setFilteredLive] = useState<LiveItem[]>([]);
  const [blog, setBlog] = useState<LiveItem[]>([]);

  const [keyword, setKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const scrollPosition = useRef(0);

  let globalIndex = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/live/");
        const data: LiveItem[] = await response.json();
        console.log(data);
        setLive(data.filter((x) => x.liveType !== "BLOG"));
        setFilteredLive(data.filter((x) => x.liveType !== "BLOG"));
        setBlog(data.filter((x) => x.liveType === "BLOG"));
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (initialExpandedId) {
      setExpandedId(initialExpandedId);
    }
  }, [initialExpandedId]);

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
      filteredItems = filteredItems.filter((item) => {
        if (category === "Hackathon") {
          return item.liveType === "HACKHATHONS";
        }
        return item.liveType === category;
      });
    }

    if (lowerCaseKeyword) {
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(lowerCaseKeyword)
      );
    }

    setFilteredLive(filteredItems);
  };

  const toggleExpand = (id: number) => {
    setExpandedId(prevId => {
      if (prevId === id) {
        const detailsElement = document.getElementById(`details-${id}`);
        const titleElement = document.getElementById(`title-${id}`);
        const arrowElement = document.getElementById(`arrow-${id}`);
        
        if (detailsElement && titleElement && arrowElement) {
          detailsElement.style.maxHeight = '0px';
          titleElement.classList.remove(styles.expandedTitle);
          arrowElement.classList.remove(styles.rotated);
        }
        return null;
      } else {
        const detailsElement = document.getElementById(`details-${id}`);
        const titleElement = document.getElementById(`title-${id}`);
        const arrowElement = document.getElementById(`arrow-${id}`);
        
        if (detailsElement && titleElement && arrowElement) {
          detailsElement.style.maxHeight = `${detailsElement.scrollHeight}px`;
          titleElement.classList.add(styles.expandedTitle);
          arrowElement.classList.add(styles.rotated);
        }
        return id;
      }
    });
  };

  const formatDate = (dateString: string | undefined) => {
    console.log(dateString);
    if (!dateString) return "";
    const date = new Date(dateString);
    console.log(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const handleShareClick = (
    e: React.MouseEvent,
    item: LiveItem | undefined
  ) => {
    e.stopPropagation();
    if (item && item.id) {
      console.log("Share clicked for item with ID:", item.id);
      const shareUrl = `https://beta.coinmarketjob.com?lives=${item.id}`;
      navigator.clipboard.writeText(shareUrl);
      setSuccessMessage("Link Copied to Clipboard");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } else {
      console.log("Share clicked, but item or item ID is undefined");
    }
  };

  const getAlternatingRows = (items: LiveItem[]) => {
    const combined: JSX.Element[] = [];
    let liveIndex = 0;
    let blogIndex = 0;
    console.log(items);
    while (liveIndex < items.length || blogIndex < blog.length) {
      for (
        let i = 0;
        i < 2 && liveIndex < items.length;
        i++, liveIndex++, globalIndex++
      ) {
        const currentItem = items[liveIndex];
        if (currentItem.liveType === "HACKHATHONS") {
          combined.push(
            <HackathonCard
              key={`hackathon-${currentItem.id}`}
              name={currentItem.title}
              organizer={currentItem.organisation || ""}
              date={formatDate(currentItem.date)}
              location={currentItem.location} // You might want to add this field to your LiveItem interface
              prizePool={currentItem.prizePool} // You might want to add this field to your LiveItem interface
              participants={currentItem.participants} // You might want to add this field to your LiveItem interface
              url={currentItem.url} // You might want to add this field to your LiveItem interface
            />
          );
        } else {
          const isExpanded = expandedId === currentItem.id;
          const index = globalIndex;
          combined.push(
            <div
              key={`live-${liveIndex}`}
              className={styles.liveItem}
              onClick={() => toggleExpand(currentItem.id)}
            >
              <div className={styles.DetailArrow}>
                <svg
                  id={`arrow-${currentItem.id}`}
                  className={styles.arrow}
                  width="19"
                  height="10"
                  viewBox="0 0 19 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29366 10C9.09763 10 8.91677 9.96799 8.75108 9.90396C8.58539 9.83962 8.42304 9.7281 8.26403 9.56939L0.274133 1.57904C0.10359 1.4088 0.0125526 1.19987 0.00102115 0.95225C-0.0108137 0.704932 0.0802237 0.484469 0.274133 0.290862C0.467739 0.0969527 0.682436 0 0.918223 0C1.15401 0 1.36871 0.0969527 1.56231 0.290862L9.29366 8.02176L17.025 0.290862C17.1953 0.120319 17.4042 0.0292816 17.6518 0.0177502C17.8991 0.00591532 18.1196 0.0969527 18.3132 0.290862C18.5071 0.484469 18.6041 0.699166 18.6041 0.934953C18.6041 1.17074 18.5071 1.38544 18.3132 1.57904L10.3233 9.56939C10.1643 9.7281 10.0019 9.83962 9.83625 9.90396C9.67056 9.96799 9.4897 10 9.29366 10Z"
                    fill="#999999"
                  />
                </svg>
              </div>
              <div id={`title-${currentItem.id}`} className={styles.Title}>{currentItem.title}</div>
              <div id={`details-${currentItem.id}`} className={styles.Details}>
                <div className={styles.NewsDetails}>
                  {currentItem.content}
                </div>
              </div>
              <div className={styles.NewsMetadata}>
                {currentItem.author && (
                  <span className={styles.Author}>By {currentItem.author}</span>
                )}
                {currentItem.date && (
                  <span className={styles.Date}>
                    {formatDate(currentItem.date)}
                  </span>
                )}
              </div>
              <div
                className={`${styles.bottomRow} ${
                  isExpanded ? styles.expanded : ""
                }`}
              >
                <div className={styles.Type}>{currentItem.liveType}</div>

                <div className={styles.iconContainer}>

                  <Icon
                    onClick={(e) => handleShareClick(e, currentItem)}
                    hoverSize={40}
                    hoverContent="Share"
                    tooltipPosition="top"
                  >
                    <svg
                      width="18"
                      height="29"
                      viewBox="0 0 27 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.1484 24.5C17.1484 22.0147 19.1632 20 21.6484 20C24.1337 20 26.1484 22.0147 26.1484 24.5C26.1484 26.9853 24.1337 29 21.6484 29C19.1632 29 17.1484 26.9853 17.1484 24.5Z"
                        fill="#A7A7A6"
                      />
                      <path
                        d="M18.1484 24.5C18.1484 22.567 19.7154 21 21.6484 21C23.5814 21 25.1484 22.567 25.1484 24.5C25.1484 26.433 23.5814 28 21.6484 28C19.7154 28 18.1484 26.433 18.1484 24.5Z"
                        fill="white"
                      />
                      <path
                        d="M0 14.5C0 12.0147 2.01472 10 4.5 10C6.98528 10 9 12.0147 9 14.5C9 16.9853 6.98528 19 4.5 19C2.01472 19 0 16.9853 0 14.5Z"
                        fill="#A7A7A6"
                      />
                      <path
                        d="M1 14.5C1 12.567 2.567 11 4.5 11C6.433 11 8 12.567 8 14.5C8 16.433 6.433 18 4.5 18C2.567 18 1 16.433 1 14.5Z"
                        fill="white"
                      />
                      <path
                        d="M17.1484 4.5C17.1484 2.01472 19.1632 0 21.6484 0C24.1337 0 26.1484 2.01472 26.1484 4.5C26.1484 6.98528 24.1337 9 21.6484 9C19.1632 9 17.1484 6.98528 17.1484 4.5Z"
                        fill="#A7A7A6"
                      />
                      <path
                        d="M18.1484 4.5C18.1484 2.567 19.7154 1 21.6484 1C23.5814 1 25.1484 2.567 25.1484 4.5C25.1484 6.433 23.5814 8 21.6484 8C19.7154 8 18.1484 6.433 18.1484 4.5Z"
                        fill="white"
                      />
                      <path
                        d="M7.64844 12.093L18.0022 6.04275L18.5068 6.90615L8.15297 12.9564L7.64844 12.093Z"
                        fill="#A7A7A6"
                      />
                      <path
                        d="M18.006 22.8531L7.61021 16.8753L8.1087 16.0084L18.5045 21.9863L18.006 22.8531Z"
                        fill="#A7A7A6"
                      />
                    </svg>
                  </Icon>
                </div>
              </div>
            </div>
          );
        }
      }

      for (let i = 0; i < 2; i++) {
        const rowItems = [];
        for (let j = 0; j < 10; j++, blogIndex++, globalIndex++) {
          // 20'den 10'a düşürüldü
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
            className={`${styles.blogRow} ${
              i % 2 === 0 ? styles.scrollLeft : styles.scrollRight
            }`}
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
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      <Search
        keyword={keyword}
        ChangeFunction={ChangeFunction}
        handleKeyDown={handleKeyDown}
      />
      <Categories onCategoryClick={handleCategoryClick} />
      <div className={styles.Content}>
        {getAlternatingRows(
          filteredLive.map((item) => ({
            ...item,
            date: item.date
              ? new Date(item.date).toLocaleDateString()
              : undefined,
          }))
        )}
      </div>
      <div className={styles.blurEffect}></div>
    </div>
  );
};

export default Live;