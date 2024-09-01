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

const Profile = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        <div className={styles.loadingOverlay}></div>
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
                <Image
                  className={styles.avatarImage}
                  src={profile?.logoURL != "" ? profile?.logoURL : avatarImage}
                  width={140}
                  height={140}
                  alt="Avatar"
                />
              </div>
              <div className={styles.HeadLine}>{profile?.nameSurname}</div>
              <div className={styles.HeadLine}>{profile?.headline}</div>
              <div className={styles.HeadSite}>
                <div className={styles.SiteText}>{profile?.siteUrl}</div>
              </div>
              <div className={styles.About}>
                <Draft show border content={profile?.about} />
              </div>
              <div className={styles.SocialMedias}>
                {profile?.socialMedias.map(
                  (item: SocialMedia, index: number) => (
                    <SocialMediaItem
                      key={index}
                      type={item.socialMediaType}
                      url={item.socialMediaUrl}
                    />
                  )
                )}
              </div>

              <div className={styles.LineDiv}>
                <div className={styles.Line}></div>
              </div>

              <div className={styles.ProfileSectionContainer}>
                <ProfileSections profile={profile} />
              </div>
            </>
          ) : (
            <EditProfile />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
