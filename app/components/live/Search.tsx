import React, { useState, useRef } from "react";
import styles from "./Search.module.css";

interface props {
  keyword: string;
  ChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Search: React.FC<props> = ({ keyword, ChangeFunction, handleKeyDown }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <svg
        width="27"
        height="26"
        viewBox="0 0 27 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.searchIcon}
      >
        <path
          opacity="0.7"
          d="M25.2197 26L19.6359 20.9193C18.5931 21.7989 17.3939 22.4798 16.0383 22.962C14.6827 23.4442 13.3205 23.6853 11.9517 23.6853C8.61136 23.6853 5.78424 22.5396 3.47033 20.2482C1.15678 17.9567 0 15.1571 0 11.8494C0 8.54122 1.15626 5.73921 3.46877 3.44332C5.78128 1.14777 8.60666 0 11.9449 0C15.2835 0 18.1113 1.14622 20.4284 3.43867C22.745 5.73146 23.9034 8.53278 23.9034 11.8426C23.9034 13.2785 23.6467 14.6681 23.1333 16.0113C22.6199 17.3545 21.9461 18.503 21.1119 19.4567L26.6957 24.5379C26.6957 24.5379 26.2459 24.9835 25.9577 25.269C25.6695 25.5545 25.2197 26 25.2197 26ZM11.9517 21.6188C14.7189 21.6188 17.055 20.6749 18.9601 18.7871C20.8653 16.8997 21.8179 14.5849 21.8179 11.8426C21.8179 9.10038 20.8653 6.78555 18.9601 4.89814C17.055 3.01038 14.7189 2.06651 11.9517 2.06651C9.18419 2.06651 6.84804 3.01038 4.94324 4.89814C3.03811 6.78555 2.08554 9.10038 2.08554 11.8426C2.08554 14.5849 3.03811 16.8997 4.94324 18.7871C6.84804 20.6749 9.18419 21.6188 11.9517 21.6188Z"
          fill="#999999"
        />
      </svg>

      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Filter by keyword"
        type="text"
        value={keyword}
        onChange={ChangeFunction}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;