import React, { useState, useRef, useEffect } from "react";
import styles from "./Categories.module.css";

interface Props {
  onCategoryClick: (category: string) => void;
}

const Categories: React.FC<Props> = ({ onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    if (["Article", "Academy", "Live"].includes(category)) {
      return;
    }
    if (activeCategory === category) {
      setActiveCategory(null);
      onCategoryClick("");
    } else {
      setActiveCategory(category);
      onCategoryClick(category);
    }
  };

  const categories = ["News", "Hackathon", "Event", "Blog", "Article", "Academy", "Live"];

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', checkScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const handleShift = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.CategoriesWrapper}>
      {showLeftArrow && (
        <div className={`${styles.ShiftArrow} ${styles.ShiftArrowLeft}`} onClick={() => handleShift('left')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      <div ref={containerRef} className={styles.Container}>
        {categories.map((category) => (
          <div
            key={category}
            className={`${styles.Element} 
              ${activeCategory === category ? styles.active : ""}
              ${["Article", "Academy", "Live"].includes(category) ? styles.disabled : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      {showRightArrow && (
        <div className={styles.ShiftArrow} onClick={() => handleShift('right')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Categories;
