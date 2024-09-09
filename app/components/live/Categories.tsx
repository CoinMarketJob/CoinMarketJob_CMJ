import React, { useState } from "react";
import styles from "./Categories.module.css";

interface Props {
  onCategoryClick: (category: string) => void;
}

const Categories: React.FC<Props> = ({ onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  const categories = ["News", "Hackathon", "Event", "Blog", "Academy", "Live"];

  return (
    <div className={styles.Container}>
      {categories.map((category) => (
        <div
          key={category}
          className={`${styles.Element} 
            ${activeCategory === category ? styles.active : ""}
            ${["Academy", "Live"].includes(category) ? styles.disabled : ""}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;
