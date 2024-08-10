import React, { useState } from 'react';
import styles from './Categories.module.css';

interface Props {
  onCategoryClick: (category: string) => void;
}

const Categories: React.FC<Props> = ({ onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      onCategoryClick(''); // Filtreyi kaldırmak için boş bir değer gönderiyoruz
    } else {
      setActiveCategory(category);
      onCategoryClick(category);
    }
  };

  return (
    <div className={styles.Container}>
      <div
        className={`${styles.Element} ${activeCategory === 'News' ? styles.active : ''}`}
        onClick={() => handleCategoryClick('News')}
      >
        NEWS
      </div>
      <div
        className={`${styles.Element} ${activeCategory === 'HACKHATHONS' ? styles.active : ''}`}
        onClick={() => handleCategoryClick('HACKHATHONS')}
      >
        HACKHATHONS
      </div>
      <div
        className={styles.Element}
        onClick={() => window.open('https://blog.coinmarketjob.com', '_blank')}
      >
        BLOG
      </div>
    </div>
  );
};

export default Categories;
