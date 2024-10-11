"use client";
import React, { useState } from "react";
import styles from "./Footer.module.css";
import Icon from "../general/Icon";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLiveVisibility } from "@/hooks/useLiveVisibility";

const Footer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isLiveVisible, toggleLiveVisibility } = useLiveVisibility();

  const Settings = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push("/settings");
  };

  const SavedJobs = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  
      router.push("/savedjobs");
   
  };

  return (
    <div className={styles.FooterContainer}>
      <Icon onClick={Settings} hoverContent="Settings" hoverSize={47.59}>
      <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0281 1H18.356L20.683 4.33854C20.846 4.57902 21.1573 4.6922 21.4686 4.63561L25.2184 3.80098L28.4347 6.87073L27.575 10.4639C27.5009 10.7468 27.6343 11.0439 27.8863 11.2137L31.3842 13.4346V17.5654L27.8863 19.7863C27.6343 19.9561 27.5009 20.2532 27.575 20.5361L28.4347 24.1293L25.2184 27.199L21.4686 26.3644C21.1573 26.3078 20.846 26.421 20.683 26.6615L18.356 30H14.0281L11.6863 26.6615C11.5233 26.421 11.212 26.3078 10.9156 26.3644L7.15094 27.199L3.93467 24.1293L4.79432 20.5361C4.86842 20.2532 4.74985 19.9561 4.48306 19.7863L1 17.5654V13.4346L4.48306 11.2137C4.74985 11.0439 4.86842 10.7468 4.79432 10.4639L3.93467 6.87073L7.15094 3.80098L10.9156 4.63561C11.212 4.6922 11.5233 4.57902 11.6863 4.33854L14.0281 1ZM15.614 3.82927L14.1615 5.90878C13.3019 7.12537 11.7456 7.71951 10.2486 7.39415L8.0847 6.91317L7.19541 7.76195L7.68452 9.82732C8.04023 11.2561 7.41773 12.7556 6.12825 13.562L3.96431 14.9483V16.0517L6.12825 17.438C7.41773 18.2444 8.04023 19.7439 7.68452 21.1727L7.19541 23.238L8.0847 24.0868L10.2486 23.6059C11.7456 23.2805 13.3019 23.8746 14.1615 25.0912L15.614 27.1707H16.7701L18.2078 25.0912C19.0675 23.8746 20.6237 23.2805 22.1355 23.6059L24.2846 24.0868L25.1888 23.238L24.6848 21.1727C24.3439 19.7439 24.9516 18.2444 26.2411 17.438L28.4199 16.0517V14.9483L26.2411 13.562C24.9516 12.7556 24.3439 11.2561 24.6848 9.82732L25.1888 7.76195L24.2846 6.91317L22.1355 7.39415C20.6237 7.71951 19.0675 7.12537 18.2078 5.90878L16.7701 3.82927H15.614ZM16.1921 13.378C14.9619 13.378 13.9689 14.3259 13.9689 15.5C13.9689 16.6741 14.9619 17.622 16.1921 17.622C17.4074 17.622 18.4153 16.6741 18.4153 15.5C18.4153 14.3259 17.4074 13.378 16.1921 13.378ZM11.0045 15.5C11.0045 12.7698 13.3167 10.5488 16.1921 10.5488C19.0526 10.5488 21.3796 12.7698 21.3796 15.5C21.3796 18.2302 19.0526 20.4512 16.1921 20.4512C13.3167 20.4512 11.0045 18.2302 11.0045 15.5Z" fill="#242220" fill-opacity="0.4" stroke="white" stroke-width="1.5"/>
</svg>


      </Icon>

      <Icon onClick={SavedJobs} hoverSize={47.59} hoverContent="Save">
      
      <svg width="21" height="28" viewBox="0 0 21 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.5 2.62525C0.5 1.4759 1.4759 0.5 2.62526 0.5V2.62525V23.6414L9.24079 18.5604C9.5947 18.2823 10.2128 18.2823 10.5667 18.5604L17.6768 23.6414V2.62525H2.62526V0.5H17.6768C18.8262 0.5 19.802 1.4759 19.802 2.62525V26.1901C19.802 26.6823 19.5286 27.1308 19.091 27.355C18.6535 27.5793 18.1284 27.541 17.7292 27.2566L10.001 21.7404L2.27286 27.2566C1.8736 27.541 1.34855 27.5793 0.911007 27.355C0.473464 27.1308 0.2 26.6823 0.2 26.1901V2.62525Z" fill="#242220" fill-opacity="0.4" stroke="white" stroke-width="1.1"/>
</svg>











      </Icon>

      <Icon onClick={toggleLiveVisibility} hoverSize={47.59} hoverContent={isLiveVisible ? "Hide Loop" : "Show Loop"}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.83067 22.1027L3.93679 21.9967C3.77199 21.8317 3.691 21.6357 3.691 21.4C3.691 21.1643 3.77199 20.9683 3.93679 20.8033L7.87 16.8701L7.87007 16.8701C8.02507 16.7153 8.219 16.6345 8.4626 16.6307C8.70242 16.627 8.89939 16.7064 9.06333 16.8701L9.16933 16.764M3.83067 22.1027L3.93667 21.9965C4.10061 22.1603 4.29758 22.2396 4.5374 22.236C4.78103 22.2321 4.97498 22.1514 5.13 21.9965L9.06321 18.0633C9.22801 17.8983 9.309 17.7023 9.309 17.4667C9.309 17.231 9.22801 17.035 9.06321 16.87L9.16933 16.764M3.83067 22.1027C3.63756 21.9093 3.541 21.6751 3.541 21.4C3.541 21.1249 3.63756 20.8907 3.83067 20.6973V22.1027ZM9.16933 16.764C8.976 16.5709 8.73967 16.4764 8.46033 16.4807L9.16933 18.1693C9.36244 17.976 9.459 17.7418 9.459 17.4667C9.459 17.1916 9.36244 16.9573 9.16933 16.764ZM4.00346 5.13L7.93667 9.06321C8.10167 9.22801 8.29767 9.309 8.53333 9.309C8.769 9.309 8.965 9.22801 9.13 9.06321L9.236 9.16933M4.00346 5.13L4.00334 3.93679C4.16833 3.77199 4.36434 3.691 4.6 3.691C4.83566 3.691 5.03167 3.77199 5.19666 3.93679L9.12987 7.87C9.2847 8.02502 9.36545 8.21897 9.36935 8.4626C9.37298 8.70242 9.29362 8.89939 9.12987 9.06333L9.236 9.16933M4.00346 5.13C3.84864 4.97499 3.76788 4.78103 3.76398 4.5374L4.00346 5.13ZM9.236 9.16933C9.42911 8.976 9.52356 8.73967 9.51933 8.46033L7.83067 9.16933C8.024 9.36245 8.25822 9.459 8.53333 9.459C8.80844 9.459 9.04267 9.36245 9.236 9.16933ZM11.4534 25.2133C11.879 25.6386 12.3916 25.85 13 25.85C13.6084 25.85 14.121 25.6386 14.5466 25.2133C14.972 24.7877 15.1833 24.2751 15.1833 23.6667C15.1833 23.0583 14.972 22.5456 14.5466 22.12C14.121 21.6947 13.6084 21.4833 13 21.4833C12.3916 21.4833 11.879 21.6947 11.4534 22.12C11.4534 22.1201 11.4534 22.1201 11.4534 22.1201M11.4534 25.2133L11.4534 22.1201M11.4534 25.2133C11.4534 25.2133 11.4534 25.2133 11.4534 25.2132M11.4534 25.2133L11.4534 25.2132M11.4534 22.1201C11.028 22.5457 10.8167 23.0583 10.8167 23.6667C10.8167 24.2751 11.028 24.7877 11.4534 25.2132M11.4534 22.1201V25.2132M16.8307 16.764L16.9367 16.8701C17.1017 16.7053 17.2977 16.6243 17.5333 16.6243C17.769 16.6243 17.965 16.7053 18.13 16.8701L22.0632 20.8033L16.9367 18.0633C16.7819 17.9083 16.7012 17.7143 16.6973 17.4707C16.6937 17.2309 16.773 17.0339 16.9368 16.87L16.8307 16.764ZM16.8307 16.764C16.6376 16.9573 16.5431 17.1937 16.5473 17.473C16.5518 17.7526 16.6462 17.9847 16.8307 18.1693L18.236 16.764C18.0427 16.5709 17.8084 16.4743 17.5333 16.4743C17.2582 16.4743 17.024 16.5709 16.8307 16.764ZM20.8692 3.93762L20.87 3.9368C21.0267 3.78025 21.2192 3.69686 21.4561 3.68721C21.6836 3.67794 21.8836 3.75731 22.0632 3.93667C22.228 4.10167 22.309 4.29767 22.309 4.53333C22.309 4.76895 22.228 4.96492 22.0633 5.1299C22.0633 5.12993 22.0632 5.12996 22.0632 5.13L18.084 9.08325L18.0836 9.0836C17.9121 9.25515 17.7134 9.3399 17.4809 9.34369C17.2528 9.34719 17.0519 9.26465 16.8719 9.08543C16.7035 8.90426 16.6199 8.70187 16.614 8.47328C16.6084 8.24995 16.6895 8.05108 16.8696 7.87049C16.8698 7.87033 16.87 7.87017 16.8701 7.87001L20.8692 3.93762ZM2.33333 15.1833C1.72492 15.1833 1.21229 14.9719 0.786707 14.5466C0.361367 14.121 0.15 13.6084 0.15 13C0.15 12.3916 0.361367 11.879 0.786707 11.4534C1.21229 11.0281 1.72492 10.8167 2.33333 10.8167C2.94175 10.8167 3.45438 11.0281 3.87996 11.4534C4.3053 11.879 4.51667 12.3916 4.51667 13C4.51667 13.6084 4.3053 14.121 3.87996 14.5466C3.45438 14.9719 2.94175 15.1833 2.33333 15.1833ZM13 4.51667C12.3916 4.51667 11.879 4.30528 11.4534 3.87991C11.028 3.45434 10.8167 2.94173 10.8167 2.33333C10.8167 1.72494 11.028 1.21233 11.4534 0.786758C11.879 0.361383 12.3916 0.15 13 0.15C13.6084 0.15 14.121 0.361366 14.5466 0.786706C14.972 1.21229 15.1833 1.72492 15.1833 2.33333C15.1833 2.94175 14.972 3.45438 14.5466 3.87996C14.121 4.3053 13.6084 4.51667 13 4.51667ZM20.87 21.9965L16.9368 18.0633L22.0633 20.8034C22.2181 20.9584 22.2988 21.1523 22.3027 21.3959C22.3063 21.6358 22.227 21.8327 22.0632 21.9967L22.1693 22.1027L22.0633 21.9965C21.8983 22.1613 21.7023 22.2423 21.4667 22.2423C21.231 22.2423 21.035 22.1613 20.87 21.9965ZM23.6667 15.1833C23.0583 15.1833 22.5456 14.9719 22.12 14.5466C21.6947 14.121 21.4833 13.6084 21.4833 13C21.4833 12.3916 21.6947 11.879 22.12 11.4534C22.5456 11.0281 23.0583 10.8167 23.6667 10.8167C24.2751 10.8167 24.7877 11.0281 25.2133 11.4534C25.6386 11.879 25.85 12.3916 25.85 13C25.85 13.6084 25.6386 14.121 25.2133 14.5466C24.7877 14.9719 24.2751 15.1833 23.6667 15.1833Z" fill="#242220" fill-opacity="0.4" stroke="white" stroke-width="0.1"/>
</svg>

      </Icon>

      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Footer;


