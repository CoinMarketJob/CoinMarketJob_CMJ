import React from "react";
import styles from "./ProfileSections.module.css";
import { JSONContent } from "@tiptap/react";
import { SocialMedia } from "@prisma/client";
import Draft from "../general/Draft";

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
          <span className={styles.sectionTitle}>
            {sectionType == "WorkExperience" ? "Work Experience" : sectionType}
          </span>
          <div className={styles.SameTypeSectionGroup}>
            {sections.map((section) => {
              if (section.sectionType == "Certifications") {
                return (
                  <div key={section.id} className={styles.sectionCard}>
                    <div className={styles.sectionTitle}>
                      {section.title} - {section.institution}
                    </div>
                    <div
                      className={styles.sectionDescription}
                      style={{ margin: 0 }}
                    >
                      <Draft show border content={section.description} />
                    </div>
                  </div>
                );
              } else if (section.sectionType == "Projects") {
                return (
                  <div key={section.id} className={styles.sectionCard}>
                    <div className={styles.sectionTitle}>
                      {section.title} by {section.institution}
                    </div>

                    <div className={styles.sectionDate}>
                      <span>{section.from}</span>
                      <span> - </span>
                      <span>{section.to}</span>
                    </div>

                    <div
                      className={styles.sectionDescription}
                      style={{ margin: 0 }}
                    >
                      <Draft show border content={section.description} />
                    </div>
                  </div>
                );
              }else if (section.sectionType == "Awards" || section.sectionType == "Publications") {
                return (
                  <div key={section.id} className={styles.sectionCard}>
                    <div className={styles.sectionTitle}>
                      {section.title}
                    </div>

                    <div className={styles.HeadlineAward}>{section.institution}, {section.from} {section.to}</div>

                    <div
                      className={styles.sectionDescription}
                      style={{ margin: 0 }}
                    >
                      <Draft show border content={section.description} />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={section.id} className={styles.sectionCard}>
                    <div className={styles.sectionTitle}>
                      {section.title} at {section.institution}
                    </div>
                    <div className={styles.sectionLocation}>
                      {section.location}
                    </div>
                    <div className={styles.sectionDateDescription}>
                      <div className={styles.sectionDate}>
                        <span>{section.from}</span>
                        <span> - </span>
                        <span>{section.to}</span>
                      </div>

                      <div className={styles.sectionDescription}>
                        <Draft show border content={section.description} />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSections;
