"use client";
import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import styles from "./LocationSelector.module.css";

interface JobTitleProps {
  selectedLocations: string[];
  setSelectedLocations: Dispatch<SetStateAction<string[]>>;
}

const LocationSelector: React.FC<JobTitleProps> = ({
  selectedLocations,
  setSelectedLocations,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef}  style={{position: "relative"}}>
      <div className={styles.TopPart} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.LocationText}>Location</div>
        <div>
          <svg
            width="19"
            height="10"
            viewBox="0 0 19 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`arrow-icon ${isOpen ? "open" : ""}`}
          >
            <path
              d="M9.29366 10C9.09763 10 8.91677 9.96799 8.75108 9.90396C8.58539 9.83962 8.42304 9.7281 8.26403 9.56939L0.274133 1.57904C0.10359 1.4088 0.0125526 1.19987 0.00102115 0.95225C-0.0108137 0.704932 0.0802237 0.484469 0.274133 0.290862C0.467739 0.0969527 0.682436 0 0.918223 0C1.15401 0 1.36871 0.0969527 1.56231 0.290862L9.29366 8.02176L17.025 0.290862C17.1953 0.120319 17.4042 0.0292816 17.6518 0.0177502C17.8991 0.00591532 18.1196 0.0969527 18.3132 0.290862C18.5071 0.484469 18.6041 0.699166 18.6041 0.934953C18.6041 1.17074 18.5071 1.38544 18.3132 1.57904L10.3233 9.56939C10.1643 9.7281 10.0019 9.83962 9.83625 9.90396C9.67056 9.96799 9.4897 10 9.29366 10Z"
              fill="#999999"
            />
          </svg>
        </div>
      </div>
      <div className={styles.Menu} style={{display: !isOpen ? "none" : ""}}>TesttestTesttestTesttest</div>
    </div>
  );
};

export default LocationSelector;
