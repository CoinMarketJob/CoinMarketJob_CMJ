import React, { useState, useRef } from "react";
import styles from "./Categories.module.css";

interface Props {
  onCategoryClick: (category: string) => void;
}

const Categories: React.FC<Props> = ({ onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isShifted, setIsShifted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    if (["Academy", "Live"].includes(category)) {
      return; // Bu kategoriler için tıklama işlemi yapma
    }
    if (activeCategory === category) {
      setActiveCategory(null);
      onCategoryClick(""); // Filtreyi kaldırmak için boş bir değer gönderiyoruz
    } else {
      setActiveCategory(category);
      onCategoryClick(category);
    }
  };

  const categories = ["NEWS", "HACKATHON", "EVENT", "BLOG", "ACADEMY", "LIVE"];

  const handleShift = () => {
    setIsShifted(!isShifted);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: isShifted ? 0 : containerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.CategoriesWrapper}>
      <div ref={containerRef} className={`${styles.Container} ${isShifted ? styles.shifted : ''}`}>
        {categories.map((category) => (
          <div
            key={category}
            className={`${styles.Element} 
              ${activeCategory === category ? styles.active : ""}
              ${["ACADEMY", "LIVE"].includes(category) ? styles.disabled : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className={styles.ShiftArrow} onClick={handleShift}>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: isShifted ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
        >
          <path d="M9 18L15 12L9 6" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default Categories;
