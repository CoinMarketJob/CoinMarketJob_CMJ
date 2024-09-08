import React, { useState } from "react";
import styles from "./Categories.module.css";

interface Props {
  onCategoryClick: (category: string) => void;
}

const Categories: React.FC<Props> = ({ onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      onCategoryClick(""); // Filtreyi kaldırmak için boş bir değer gönderiyoruz
    } else {
      setActiveCategory(category);
      onCategoryClick(category);
    }
  };

  return (
    <div className={styles.Container}>
      <div
        className={`${styles.Element} ${
          activeCategory === "News" ? styles.active : ""
        }`}
        onClick={() => handleCategoryClick("News")}
      >
        News
      </div>

      <div
        className={`${styles.Element} ${
          activeCategory === "HACKHATHONS" ? styles.active : ""
        }`}
        onClick={() => handleCategoryClick("HACKHATHONS")}
      >
        Hackathon
      </div>

      <div
        className={`${styles.Element} ${
          activeCategory === "HACKHATHONS" ? styles.active : ""
        }`}
        onClick={() => handleCategoryClick("HACKHATHONS")}
      >
        Event
      </div>

      <div
        className={`${styles.Element} ${
          activeCategory === "HACKHATHONS" ? styles.active : ""
        }`}
        onClick={() => handleCategoryClick("HACKHATHONS")}
      >
        Blog
      </div>

      <div
        className={styles.Element}
        onClick={() => window.open("https://coinmarketjob.com/blog", "_blank")}
      >
        Academy
      </div>

      <div
        className={styles.Element}
        onClick={() => window.open("https://coinmarketjob.com/blog", "_blank")}
      >
        Live
      </div>
    </div>
  );
};

export default Categories;
