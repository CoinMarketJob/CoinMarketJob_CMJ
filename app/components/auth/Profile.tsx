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

interface ProfileData {
  id: number;
  userId: number;
  logoURL?: string;
  jobTitle?: string;
  location?: string;
  headline?: string;
  siteUrl?: string;
  about?: JSONContent;
  sectionsOrder: string;
  section: ProfileSection[];
  socialMedias: SocialMedia[];
}

const LoadingPlaceholder = () => (
  <div className={styles.placeholderContent}>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
    <div className={styles.placeholderContent_item}></div>
  </div>
);

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
        console.log(data);
        setProfile(data);
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
                Company Profile
              </a>
            </div>
          </div>
          {editProfile === false ? (
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
              <div className={styles.HeadLine}>{profile?.nameSurname}</div>
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
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.76937 17.75C2.19396 17.75 1.71354 17.5573 1.32812 17.1719C0.942708 16.7865 0.75 16.306 0.75 15.7306V2.26937C0.75 1.69396 0.942708 1.21354 1.32812 0.828125C1.71354 0.442708 2.19396 0.25 2.76937 0.25H21.2306C21.806 0.25 22.2865 0.442708 22.6719 0.828125C23.0573 1.21354 23.25 1.69396 23.25 2.26937V15.7306C23.25 16.306 23.0573 16.7865 22.6719 17.1719C22.2865 17.5573 21.806 17.75 21.2306 17.75H2.76937ZM22 2.60563L12.56 8.78594C12.4719 8.8324 12.3826 8.87125 12.2922 8.9025C12.2016 8.93375 12.1042 8.94938 12 8.94938C11.8958 8.94938 11.7984 8.93375 11.7078 8.9025C11.6174 8.87125 11.5281 8.8324 11.44 8.78594L2 2.60563V15.7306C2 15.955 2.07208 16.1394 2.21625 16.2838C2.36062 16.4279 2.545 16.5 2.76937 16.5H21.2306C21.455 16.5 21.6394 16.4279 21.7838 16.2838C21.9279 16.1394 22 15.955 22 15.7306V2.60563ZM12 7.75L21.6153 1.5H2.38469L12 7.75ZM2 2.87031V1.85563V1.89906V1.83531V2.87031Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>

                  <div>
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.7303 19C15.7283 19 13.6761 18.4988 11.5737 17.4963C9.4712 16.4937 7.51786 15.0865 5.71366 13.2748C3.90965 11.4632 2.50632 9.51 1.50367 7.41505C0.501224 5.3201 0 3.27166 0 1.26973C0 0.906954 0.11875 0.604635 0.35625 0.36278C0.59375 0.120926 0.890625 0 1.24687 0H4.18356C4.50636 0 4.788 0.101631 5.02847 0.304891C5.26914 0.508152 5.43212 0.768906 5.51742 1.08716L6.10642 3.91875C6.16124 4.25066 6.15135 4.5407 6.07673 4.78889C6.00212 5.03708 5.87041 5.24034 5.68159 5.39867L3.07622 7.8283C3.56329 8.71279 4.10182 9.53454 4.69181 10.2935C5.2818 11.0526 5.91098 11.7715 6.57934 12.4503C7.26889 13.1401 8.01107 13.7814 8.80591 14.3744C9.60054 14.9673 10.4729 15.5273 11.4229 16.0541L13.9623 13.4689C14.1557 13.2603 14.373 13.123 14.6143 13.0569C14.8555 12.9906 15.1223 12.9772 15.4146 13.0168L17.9128 13.5283C18.2356 13.6075 18.4976 13.7701 18.6987 14.0161C18.8996 14.2619 19 14.5439 19 14.8622V17.7531C19 18.1094 18.8791 18.4062 18.6372 18.6437C18.3954 18.8813 18.093 19 17.7303 19ZM2.51898 6.71383L4.79809 4.61759C4.87409 4.55663 4.92357 4.47292 4.94653 4.36644C4.96929 4.25976 4.96543 4.1608 4.93495 4.06956L4.40741 1.55295C4.37693 1.43104 4.32369 1.3397 4.24769 1.27894C4.17149 1.21798 4.07253 1.1875 3.95081 1.1875H1.51406C1.42262 1.1875 1.34653 1.21798 1.28577 1.27894C1.22481 1.3397 1.19433 1.4158 1.19433 1.50723C1.21709 2.31869 1.34425 3.16588 1.57581 4.04878C1.80718 4.93189 2.12157 5.82024 2.51898 6.71383ZM12.5534 16.6113C13.3555 17.0088 14.2107 17.3026 15.119 17.4928C16.027 17.6832 16.8183 17.7852 17.4928 17.7988C17.5842 17.7988 17.6603 17.7684 17.7211 17.7074C17.782 17.6464 17.8125 17.5703 17.8125 17.4791V15.0949C17.8125 14.9732 17.782 14.8742 17.7211 14.798C17.6603 14.722 17.569 14.6688 17.447 14.6383L15.2502 14.1883C15.1589 14.1578 15.0791 14.154 15.0106 14.177C14.9419 14.1997 14.8696 14.2492 14.7936 14.3254L12.5534 16.6113Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>
                </div>

                {profile?.socialMedias.map(
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
          ) : (
            <EditProfile profile={profile} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
