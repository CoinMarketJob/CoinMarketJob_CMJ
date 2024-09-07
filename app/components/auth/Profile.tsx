"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import Icon from "../general/Icon";
import avatarImage from "./PlaceHolderAvatar.png";
import Image from "next/image";
import Draft from "../general/Draft";
import SocialMediaItem from "./SocialMediaItem";
import EditProfile from "./EditProfile";
import { SocialMedia } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import ProfileSections from "./ProfileSections";
import { useProfile } from "@/hooks/useCompanyProfile";
import { useProfileData } from "@/hooks/useProfileData";

interface ProfileSection {
  id: number;
  profileId: number;
  sectionType: string;
  title: string;
  from: string;
  to: string;
  institution: string;
  location: string;
  description: JSONContent;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [profile, setProfile] = useState<any | null>(null);
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const { setProfileType } = useProfile();
  const { profileData, setProfileData, companyProfileData, setCompanyProfileData } = useProfileData();
  
  const menuRef = useRef<HTMLDivElement>(null);

  const ShowDetail = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowDetail(!showDetail);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDetail(false);
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
        const response = await fetch("/api/profile/get/");
        const data = await response.json();
        setProfile(data);
        setProfileData(data);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/companyprofile/get/");
        const data = await response.json();
        console.log(data);
        setCompanyProfileData(data);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const EditProfileClick = () => {
    setEditProfile(true);
    setShowDetail(false);
  };

  const handleProfileUpdate = (updatedProfile: any) => {
    setProfile(updatedProfile);
    setEditProfile(false);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loadingPlaceholder}>
          <div className={`${styles.placeholder} ${styles.avatar}`}></div>
          <div className={`${styles.placeholder} ${styles.text}`}></div>
          <div
            className={`${styles.placeholder} ${styles.text} ${styles.short}`}
          ></div>
          <div className={`${styles.placeholder} ${styles.text}`}></div>
          <div
            className={`${styles.placeholder} ${styles.text} ${styles.short}`}
          ></div>
        </div>
      ) : (
        <>
          <div className={styles.menuContainer}>
            {!editProfile && (
              <div className={styles.Detail}>
                <Icon onClick={ShowDetail} hoverContent="Detail" hoverSize={40}>
                  <svg
                    width="17"
                    height="5"
                    viewBox="0 0 17 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.97585 4.18466C1.5071 4.18466 1.10464 4.01894 0.768466 3.6875C0.437027 3.35133 0.271307 2.94886 0.271307 2.48011C0.271307 2.0161 0.437027 1.61837 0.768466 1.28693C1.10464 0.955492 1.5071 0.789773 1.97585 0.789773C2.4304 0.789773 2.82813 0.955492 3.16903 1.28693C3.50994 1.61837 3.6804 2.0161 3.6804 2.48011C3.6804 2.79261 3.59991 3.07907 3.43892 3.33949C3.28267 3.59517 3.0767 3.80114 2.82102 3.95739C2.56534 4.1089 2.28362 4.18466 1.97585 4.18466ZM8.53288 4.18466C8.06413 4.18466 7.66167 4.01894 7.3255 3.6875C6.99406 3.35133 6.82834 2.94886 6.82834 2.48011C6.82834 2.0161 6.99406 1.61837 7.3255 1.28693C7.66167 0.955492 8.06413 0.789773 8.53288 0.789773C8.98743 0.789773 9.38516 0.955492 9.72607 1.28693C10.067 1.61837 10.2374 2.0161 10.2374 2.48011C10.2374 2.79261 10.1569 3.07907 9.99595 3.33949C9.8397 3.59517 9.63374 3.80114 9.37805 3.95739C9.12237 4.1089 8.84065 4.18466 8.53288 4.18466ZM15.0899 4.18466C14.6212 4.18466 14.2187 4.01894 13.8825 3.6875C13.5511 3.35133 13.3854 2.94886 13.3854 2.48011C13.3854 2.0161 13.5511 1.61837 13.8825 1.28693C14.2187 0.955492 14.6212 0.789773 15.0899 0.789773C15.5445 0.789773 15.9422 0.955492 16.2831 1.28693C16.624 1.61837 16.7945 2.0161 16.7945 2.48011C16.7945 2.79261 16.714 3.07907 16.553 3.33949C16.3967 3.59517 16.1908 3.80114 15.9351 3.95739C15.6794 4.1089 15.3977 4.18466 15.0899 4.18466Z"
                      fill="#999999"
                      className="svg-icon"
                    />
                  </svg>
                </Icon>

                <div
                  ref={menuRef}
                  className={styles.menu}
                  style={{ display: showDetail ? "flex" : "none" }}
                >
                  <a onClick={EditProfileClick} className={styles.menuItem}>
                    Edit profile
                  </a>
                  <a onClick={() => setProfileType(1)} className={styles.menuItem}>
                    {companyProfileData == null ? "Create Company Profile" : "Company Profile"}
                  </a>
                </div>
              </div>
            )}
          </div>
          {editProfile ? (
            <EditProfile profile={profile} onUpdate={handleProfileUpdate} />
          ) : (
            <>
              <div className={styles.avatar}>
                {profile?.logoURL ? (
                  <Image
                    className={styles.avatarImage}
                    src={profile?.logoURL}
                    width={140}
                    height={140}
                    alt="Avatar"
                  />
                ) : (
                  <Image
                    className={styles.avatarImage}
                    src={avatarImage}
                    width={140}
                    height={140}
                    alt="Avatar"
                  />
                )}
              </div>
              <div className={styles.NameSurname}>{profile?.nameSurname}</div>
              <div className={styles.HeadLine}>{profile?.headline}</div>
              {profile?.siteUrl ? (
                <div className={styles.HeadSite}>
                  <div className={styles.SiteText}>{profile?.siteUrl}</div>
                </div>
              ) : null}
              <div className={styles.About}>
                <Draft show border content={profile?.about} />
              </div>
              <div className={styles.SocialMedias}>
                <div className={styles.PhoneAndMail}>
                  <div>
                    <svg
                    //mail icon
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 19C8.18583 19 6.95083 18.7507 5.795 18.2521C4.63917 17.7536 3.63375 17.077 2.77875 16.2223C1.92375 15.3677 1.24688 14.3626 0.748125 13.2071C0.249375 12.0518 0 10.8172 0 9.50343C0 8.18979 0.249287 6.9547 0.747861 5.79817C1.24644 4.6418 1.92305 3.63586 2.77769 2.78033C3.63234 1.92481 4.63741 1.24758 5.79289 0.748653C6.94819 0.249551 8.18275 0 9.49657 0C10.8102 0 12.0453 0.249374 13.2018 0.748124C14.3582 1.24687 15.3641 1.92375 16.2197 2.77875C17.0752 3.63375 17.7524 4.63917 18.2513 5.795C18.7505 6.95083 19 8.18583 19 9.5V10.5434C19 11.4325 18.6947 12.1846 18.084 12.7997C17.4732 13.4147 16.723 13.7222 15.8333 13.7222C15.204 13.7222 14.6303 13.5496 14.112 13.2045C13.5937 12.8595 13.2107 12.4001 12.963 11.8262C12.561 12.4041 12.0593 12.8646 11.4578 13.2076C10.8563 13.5507 10.2037 13.7222 9.5 13.7222C8.32394 13.7222 7.32626 13.3125 6.50697 12.493C5.68751 11.6737 5.27778 10.6761 5.27778 9.5C5.27778 8.32394 5.68751 7.32626 6.50697 6.50697C7.32626 5.68751 8.32394 5.27778 9.5 5.27778C10.6761 5.27778 11.6737 5.68751 12.493 6.50697C13.3125 7.32626 13.7222 8.32394 13.7222 9.5V10.5434C13.7222 11.1226 13.9293 11.6212 14.3434 12.0394C14.7575 12.4576 15.2542 12.6667 15.8333 12.6667C16.4125 12.6667 16.9091 12.4576 17.3232 12.0394C17.7374 11.6212 17.9444 11.1226 17.9444 10.5434V9.5C17.9444 7.14259 17.1264 5.14583 15.4903 3.50972C13.8542 1.87361 11.8574 1.05556 9.5 1.05556C7.14259 1.05556 5.14583 1.87361 3.50972 3.50972C1.87361 5.14583 1.05556 7.14259 1.05556 9.5C1.05556 11.8574 1.87361 13.8542 3.50972 15.4903C5.14583 17.1264 7.14259 17.9444 9.5 17.9444H14.25C14.3995 17.9444 14.5249 17.9951 14.626 18.0964C14.7272 18.1978 14.7778 18.3233 14.7778 18.473C14.7778 18.6227 14.7272 18.748 14.626 18.8488C14.5249 18.9496 14.3995 19 14.25 19H9.5ZM9.5 12.6667C10.3796 12.6667 11.1273 12.3588 11.7431 11.7431C12.3588 11.1273 12.6667 10.3796 12.6667 9.5C12.6667 8.62037 12.3588 7.87269 11.7431 7.25694C11.1273 6.6412 10.3796 6.33333 9.5 6.33333C8.62037 6.33333 7.87269 6.6412 7.25694 7.25694C6.6412 7.87269 6.33333 8.62037 6.33333 9.5C6.33333 10.3796 6.6412 11.1273 7.25694 11.7431C7.87269 12.3588 8.62037 12.6667 9.5 12.6667Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>

                  <div>
                    <svg
                      width="13"
                      height="21"
                      viewBox="0 0 13 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 1V2C4.5 2.27614 4.72386 2.5 5 2.5H8.5C8.77614 2.5 9 2.27614 9 2V1M3 20H10.5C11.6046 20 12.5 19.1046 12.5 18V3C12.5 1.89543 11.6046 1 10.5 1H3C1.89543 1 1 1.89543 1 3V18C1 19.1046 1.89543 20 3 20Z"
                        stroke="#999999"
                        stroke-width="0.7"
                      />
                    </svg>
                  </div>
                </div>

                {profile?.socialMedias.length > 0 &&
                  profile?.socialMedias.map(
                    (item: SocialMedia, index: number) => (
                      <SocialMediaItem
                        key={index}
                        type={item.socialMediaType}
                        url={item.socialMediaUrl}
                        show
                        onDelete={() => {}}
                        onEdit={() => {}}
                      />
                    )
                  )}
              </div>

              <div className={styles.LineDiv}>
                <div className={styles.Line}></div>
              </div>

              <div className={styles.ProfileSectionContainer}>
                <ProfileSections profile={profile} onAdd={() => {}} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
