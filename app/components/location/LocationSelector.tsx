"use client";
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import styles from "./LocationSelector.module.css";

interface JobTitleProps {
  selectedLocations: string[];
  setSelectedLocations: Dispatch<SetStateAction<string[]>>;
  locationType: string;
  setLocationType: Dispatch<SetStateAction<string>>;
}

const LocationSelector: React.FC<JobTitleProps> = ({
  selectedLocations,
  setSelectedLocations,
  locationType,
  setLocationType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<Array<any>>([]);

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

  const filteredLocations = locations.filter((location) =>
    location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetchData() {
      try {
        const response = await fetch("/api/cities/");
        const data = await response.json();
        console.log(data);
        setLocations(data);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
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
      <div className={styles.Menu} style={{ display: !isOpen ? "none" : "" }}>
        <div className={styles.RadioDiv}>
          <input
            type="radio"
            value="Remote"
            checked={locationType === "Remote"}
            onChange={() => setLocationType("Remote")}
          />

          <div>Remote</div>
        </div>

        <div className={styles.RadioDiv}>
          <input
            type="radio"
            value="Hybrid"
            checked={locationType === "Hybrid"}
            onChange={() => setLocationType("Hybrid")}
          />

          <div>Hybrid</div>
        </div>

        <div className={styles.RadioDiv}>
          <input
            type="radio"
            value="OnSite"
            checked={locationType === "OnSite"}
            onChange={() => setLocationType("OnSite")}
          />

          <div>Onsite</div>
        </div>

        <div
          style={{ display: locationType == "Remote" ? "none" : "" }}
          className={styles.JobTitleContainer}
        >
          <svg
            width="27"
            height="26"
            viewBox="0 0 27 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.SearchIcon}
          >
            <path
              opacity="0.7"
              d="M25.2197 26L19.6359 20.9193C18.5931 21.7989 17.3939 22.4798 16.0383 22.962C14.6827 23.4442 13.3205 23.6853 11.9517 23.6853C8.61136 23.6853 5.78424 22.5396 3.47033 20.2482C1.15678 17.9567 0 15.1571 0 11.8494C0 8.54122 1.15626 5.73921 3.46877 3.44332C5.78128 1.14777 8.60666 0 11.9449 0C15.2835 0 18.1113 1.14622 20.4284 3.43867C22.745 5.73146 23.9034 8.53278 23.9034 11.8426C23.9034 13.2785 23.6467 14.6681 23.1333 16.0113C22.6199 17.3545 21.9461 18.503 21.1119 19.4567L26.6957 24.5379C26.6957 24.5379 26.2459 24.9835 25.9577 25.269C25.6695 25.5545 25.2197 26 25.2197 26ZM11.9517 21.6188C14.7189 21.6188 17.055 20.6749 18.9601 18.7871C20.8653 16.8997 21.8179 14.5849 21.8179 11.8426C21.8179 9.10038 20.8653 6.78555 18.9601 4.89814C17.055 3.01038 14.7189 2.06651 11.9517 2.06651C9.18419 2.06651 6.84804 3.01038 4.94324 4.89814C3.03811 6.78555 2.08554 9.10038 2.08554 11.8426C2.08554 14.5849 3.03811 16.8997 4.94324 18.7871C6.84804 20.6749 9.18419 21.6188 11.9517 21.6188Z"
              fill="#999999"
            />
          </svg>
          <input
            type="text"
            className={styles.LocationInput}
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div
          style={{ display: locationType == "Remote" ? "none" : "" }} className={styles.LocationsList}>
          {filteredLocations.map((location) => (
            <label key={location.id}>
              <input
                type="checkbox"
                value={location.city}
                checked={selectedLocations.includes(location.city)}
                onChange={(e) => {
                  const city = e.target.value;
                  if (selectedLocations.includes(city)) {
                    setSelectedLocations(
                      selectedLocations.filter((selected) => selected !== city)
                    );
                  } else {
                    setSelectedLocations([...selectedLocations, city]);
                  }
                }}
              />
              {location.city}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
