import React, { useState, useRef, useEffect, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from "./Categories.module.css";

interface Props {
  onCategoryClick: (category: string) => void;
}

interface CategoryItemProps {
  category: string;
  index: number;
  moveCategory: (dragIndex: number, hoverIndex: number) => void;
  handleCategoryClick: (category: string) => void;
  activeCategory: string | null;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, index, moveCategory, handleCategoryClick, activeCategory }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'category',
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCategory(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'category',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${styles.Element} 
        ${activeCategory === category ? styles.active : ""}
        ${["Article", "Academy", "Live"].includes(category) ? styles.disabled : ""}`}
      onClick={() => handleCategoryClick(category)}
      style={{ opacity }}
    >
      {category}
    </div>
  );
};

const Categories: React.FC<Props> = ({ onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Sayfa yüklendiğinde kategorileri localStorage'dan yükle
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Eğer localStorage'da kayıtlı kategori yoksa, varsayılan listeyi kullan
      setCategories(["News", "Hackathon", "Event", "Blog", "Article", "Academy", "Live"]);
    }
  }, []);

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

  const moveCategory = (dragIndex: number, hoverIndex: number) => {
    const newCategories = [...categories];
    const draggedCategory = newCategories[dragIndex];
    newCategories.splice(dragIndex, 1);
    newCategories.splice(hoverIndex, 0, draggedCategory);
    setCategories(newCategories);
    
    // Yeni kategori sırasını localStorage'a kaydet
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 1); // Küçük bir tolerans ekledik
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1); // Yuvarlama ve tolerans ekledik
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  useEffect(() => {
    checkScroll();
  }, [categories]); // categories değiştiğinde de kontrol et

  const handleShift = useCallback((direction: 'left' | 'right') => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const currentScrollLeft = container.scrollLeft;
      const categoryElements = Array.from(container.children) as HTMLElement[];

      let targetScrollLeft = currentScrollLeft;
      let visibleWidth = 0;

      if (direction === 'right') {
        for (let i = 0; i < categoryElements.length; i++) {
          const categoryElement = categoryElements[i];
          const categoryLeft = categoryElement.offsetLeft;
          const categoryWidth = categoryElement.offsetWidth;

          if (categoryLeft + categoryWidth > currentScrollLeft + containerWidth) {
            targetScrollLeft = categoryLeft + categoryWidth - containerWidth;
            break;
          }
        }
      } else {
        for (let i = categoryElements.length - 1; i >= 0; i--) {
          const categoryElement = categoryElements[i];
          const categoryLeft = categoryElement.offsetLeft;
          const categoryWidth = categoryElement.offsetWidth;

          visibleWidth += categoryWidth;
          if (visibleWidth > containerWidth || categoryLeft < currentScrollLeft) {
            targetScrollLeft = categoryLeft;
            break;
          }
        }
      }

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });

      // Kaydırma tamamlandıktan sonra ok durumunu güncelle
      setTimeout(checkScroll, 300);
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.CategoriesWrapper}>
        {showLeftArrow && (
          <div className={`${styles.ShiftArrow} ${styles.ShiftArrowLeft}`} onClick={() => handleShift('left')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <div 
          ref={containerRef} 
          className={styles.Container}
          onScroll={checkScroll} // Scroll olayını dinle
        >
          {categories.map((category, index) => (
            <CategoryItem
              key={category}
              category={category}
              index={index}
              moveCategory={moveCategory}
              handleCategoryClick={handleCategoryClick}
              activeCategory={activeCategory}
            />
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
    </DndProvider>
  );
};

export default Categories;
