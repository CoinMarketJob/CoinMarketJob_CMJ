"use client";
import React, { useState, useRef, useEffect } from "react";
import "./Searchbar.css";
import Icon from "../general/Icon";
import SearchInput from "./SearchInput";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from './Searchbar.module.css';
import { usePathname } from 'next/navigation'; // Add this import

const Searchbar = () => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Add this line
  const { data: session } = useSession();
  const burgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsBurgerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const home = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (pathname === '/') {
      // If we're already on the home page, reload the page
      window.location.reload();
    } else {
      // Otherwise, navigate to the home page
      router.push("/");
    }
    setIsFilterOpen(false);
  };

  const postajob = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push("/postajob");
  };

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleSavedJobs = () => {
    router.push("/savedjobs");
    setIsBurgerOpen(false);
  };

  const handleSettings = () => {
    router.push("/settings");
    setIsBurgerOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    setIsBurgerOpen(false);
  };

  return (
    <div className="search-container-div">
      {errorMessage && <div className="ErrorMessage">{errorMessage}</div>}
      <div className="burger-menu" ref={burgerRef}>
        <button className={styles.burgerButton} onClick={handleBurgerClick}>
          <svg
            className={`${styles.burgerIcon} ${isBurgerOpen ? styles.open : ''}`}
            viewBox="0 0 100 100"
            width="35"
            height="35"
          >
            <path
              className={`${styles.line} ${styles.line1}`}
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path
              className={`${styles.line} ${styles.line2}`}
              d="M 20,50 H 80"
            />
            <path
              className={`${styles.line} ${styles.line3}`}
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
        {isBurgerOpen && (
          <div className="burger-dropdown">
            <div className="burger-dropdown-item" onClick={handleSavedJobs}>
              Saved
            </div>
            <div className="burger-dropdown-item" onClick={handleSettings}>
              Settings
            </div>
            <div className="burger-dropdown-item" onClick={handleLogout}>
              Log out
            </div>
          </div>
        )}
      </div>

      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className="home-button">
          <Icon
            onClick={home}
            hoverSize={51}
            hoverContent="Home"
            tooltipPosition="bottom"
          >
            <svg
              width="31"
              height="35"
              viewBox="0 0 31 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 2L3 12V33H12V22H19V33H28V12L15.5 2Z"
                stroke="#242220"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.4"
              />
            </svg>
          </Icon>
        </div>
        <div className="main-container">
          <div className="searchbar-wrapper">
            <SearchInput
              tags={tags}
              setTags={setTags}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          </div>
        </div>
        <div className="post-job-button">
          <Icon
            onClick={postajob}
            hoverSize={45}
            hoverContent="Post a job"
            tooltipPosition="bottom"
          >
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 1V28M1 14.5H28"
                stroke="#242220"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.4"
              />
            </svg>
          </Icon>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
