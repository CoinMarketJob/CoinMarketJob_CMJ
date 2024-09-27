"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import styles from "./LocationSelector.module.css";
import Selection from "../general/CheckboxSelection";
import { Cities } from "@prisma/client";

interface LocationSelectorProps {
  label: string;
  selectedLocation: string[];
  setSelectedLocation: Dispatch<SetStateAction<string[]>>;
  locationType: string;
  setLocationType: Dispatch<SetStateAction<string>>;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  label,
  selectedLocation,
  setSelectedLocation,
  locationType,
  setLocationType,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cities, setCities] = useState<Cities[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/cities/");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    }

    fetchData();
  }, []);

  const handleLocationTypeChange = (newLocationType: string) => {
    setLocationType(newLocationType);
    if (newLocationType === "Remote") {
      setSelectedLocation([newLocationType]);
    } else {
      setSelectedLocation([]);
    }
  };

  const handleCheckboxChange = (newSelectedLocations: string[]) => {
    setSelectedLocation(newSelectedLocations);
  };

  const filteredOptions = cities
    .filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((option) => option.name);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div className={styles.locationContainer} onClick={toggleDropdown}>
      <div className={styles.label}>{label}</div>
      <div className={styles.arrowContainer}>
        <svg
          width="23"
          height="12"
          viewBox="0 0 23 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.arrow} ${open ? styles.arrowRotated : ""}`}
        >
          <path
            d="M11.1524 12C10.9172 12 10.7001 11.9616 10.5013 11.8847C10.3025 11.8075 10.1076 11.6737 9.91683 11.4833L0.32896 1.89485C0.124308 1.69056 0.0150631 1.43985 0.00122538 1.1427C-0.0129765 0.845918 0.0962684 0.581362 0.32896 0.349035C0.561287 0.116343 0.818923 0 1.10187 0C1.38481 0 1.64245 0.116343 1.87477 0.349035L11.1524 9.62611L20.43 0.349035C20.6343 0.144383 20.885 0.0351379 21.1822 0.0213002C21.4789 0.00709838 21.7435 0.116343 21.9758 0.349035C22.2085 0.581362 22.3249 0.838999 22.3249 1.12194C22.3249 1.40489 22.2085 1.66252 21.9758 1.89485L12.388 11.4833C12.1971 11.6737 12.0023 11.8075 11.8035 11.8847C11.6047 11.9616 11.3876 12 11.1524 12Z"
            fill="#999999"
          />
        </svg>
      </div>
      {open && (
        <div className={styles.dropdown} onClick={(e) => e.stopPropagation()} ref={dropdownRef}>
          <div className={styles.dropdownContent}>
          <div className={styles.optionsMenu}>
            <Selection
              id="location-type-selection"
              value={[locationType]}
              onChange={(selected) => handleLocationTypeChange(selected[0])}
              list={[
                { id: "Remote", label: "Remote" },
                { id: "Hybrid", label: "Hybrid" },
                { id: "Office", label: "Office" },
              ]}
              multiple={false}
              borderRadius={4}
            />
          </div>
          {(locationType === "Hybrid" || locationType === "Office") && (
          
            <div className={styles.rightContainer}>
              <div className={styles.searchContainer}>
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
                  type="text"
                  className={styles.searchInput}
                  placeholder="Location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className={styles.optionsMenu}>
                <Selection
                  id="location-selection"
                  value={selectedLocation}
                  onChange={handleCheckboxChange}
                  list={filteredOptions.map((option) => ({
                    id: option,
                    label: option,
                  }))}
                  multiple={false}
                  borderRadius={4}
                />
              </div>
              </div>
            
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
