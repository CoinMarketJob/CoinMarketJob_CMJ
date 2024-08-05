import React from "react";
import styles from "./ProfileSections.module.css";
import { JSONContent } from "@tiptap/react";
import { SocialMedia } from "@prisma/client";

interface ProfileSection {
  id: number;
  profileId: number;
  sectionType: string;
  title: string;
  from: string;
  to: string;
  institution: string;
  location: string;
  description: string;
}

interface ProfileData {
  id: number;
  userId: number;
  jobTitle?: string;
  location?: string;
  headline?: string;
  siteUrl?: string;
  about?: JSONContent;
  sectionsOrder: string;
  section: ProfileSection[];
  socialMedias: SocialMedia[];
}

interface SectionProps {
  profile: ProfileData | null;
}

const ProfileSections: React.FC<SectionProps> = ({ profile }) => {
  if (!profile) {
    return <div>Loading...</div>;
  }

  const sectionsOrder = profile.sectionsOrder
    .replace(/[{}]/g, "")
    .split(",")
    .map(Number);

  // Bölümleri sectionsOrder'a göre sıralama
  const orderedSections = sectionsOrder
    .map((order) => {
      return profile.section.find((section) => section.id === order);
    })
    .filter((section): section is ProfileSection => section !== undefined);

  const groupedSections = orderedSections.reduce((acc, section) => {
    (acc[section.sectionType] = acc[section.sectionType] || []).push(section);
    return acc;
  }, {} as { [key: string]: ProfileSection[] });

  return (
    <div className={styles.container}>
      {Object.entries(groupedSections).map(([sectionType, sections]) => (
        <div key={sectionType} className={styles.sectionGroup}>
          <h2 className={styles.sectionTitle}>{sectionType}</h2>
          {sections.map((section) => (
            <div key={section.id} className={styles.sectionCard}>
              <h3>{section.title}</h3>
              <p>{section.institution}</p>
              <p>{section.location}</p>
              <p>
                {section.from} - {section.to}
              </p>
              {/* <div>
                {section.description.map((desc, index) => (
                  <p key={index}>{desc.content}</p>
                ))}
              </div> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProfileSections;
