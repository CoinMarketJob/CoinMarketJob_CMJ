"use client";
import React, { useState } from "react";
import styles from "./ProfileSections.module.css";
import { JSONContent } from "@tiptap/react";
import { SocialMedia } from "@prisma/client";
import Draft from "./ShowDraft";
import Icon from "../general/Icon";

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
  isEditing?: boolean;
  onEdit?: (sectionId: number) => void;
  onDelete?: (sectionId: number) => void;
  onAdd: (type: string) => void;
}

const ProfileSections: React.FC<SectionProps> = ({
  profile,
  isEditing,
  onEdit,
  onDelete,
  onAdd
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => {
    setShowPopup(isEditing ? true : false);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  if (!profile) {
    return <div></div>;
  }

  const allSections = profile.section;

  const groupedSections = allSections.reduce((acc, section) => {
    (acc[section.sectionType] = acc[section.sectionType] || []).push(section);
    return acc;
  }, {} as { [key: string]: ProfileSection[] });

  return (
    <div className={styles.container}>
      {Object.entries(groupedSections).map(([sectionType, sections]) => (
        <div key={sectionType} className={styles.sectionGroup}>
          <div className={styles.Info}>
            <span className={styles.sectionTitle}>
              {sectionType == "WorkExperience"
                ? "Work Experience"
                : sectionType}
            </span>

            {isEditing && (
              <div className={styles.addIcon} onClick={() => onAdd(sectionType)}>
                <Icon
                  onClick={() => console.log("Add")}
                  hoverContent={
                    "Add " + sectionType == "WorkExperience"
                      ? "Work Experience"
                      : sectionType
                  }
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon"
                  >
                    <path
                      d="M9.18996 9.0184L9.19013 15.8036C9.19002 15.9887 9.12097 16.1525 8.98299 16.2949C8.84501 16.4372 8.6791 16.5083 8.48528 16.5084C8.29146 16.5083 8.12556 16.4393 7.98757 16.3013C7.84959 16.1633 7.78054 15.9974 7.78043 15.8036L7.7806 9.0184L0.995417 9.01857C0.810288 9.01846 0.646503 8.94941 0.504062 8.81143C0.361843 8.67345 0.290678 8.50754 0.290567 8.31372C0.290678 8.1199 0.359725 7.954 0.497708 7.81601C0.635691 7.67803 0.801594 7.60898 0.995416 7.60887L7.7806 7.60904L7.78043 0.823856C7.78054 0.638728 7.84959 0.474943 7.98757 0.332501C8.12556 0.190283 8.29146 0.119118 8.48528 0.119006C8.6791 0.119118 8.84501 0.188165 8.98299 0.326148C9.12097 0.464131 9.19002 0.630034 9.19013 0.823856L9.18996 7.60904L15.9751 7.60887C16.1603 7.60898 16.3241 7.67803 16.4665 7.81601C16.6087 7.95399 16.6799 8.1199 16.68 8.31372C16.6799 8.50754 16.6108 8.67345 16.4729 8.81143C16.3349 8.94941 16.169 9.01846 15.9751 9.01857L9.18996 9.0184Z"
                      fill="#999999"
                      fill-opacity="0.6"
                    />
                  </svg>
                </Icon>
              </div>
            )}
          </div>
          <div
            className={styles.SameTypeSectionGroup}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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
                    {isEditing && showPopup && (
                      <div className={styles.editButtons}>
                        <div className={styles.deleteIcon}>
                          <Icon
                            onClick={() => onDelete && onDelete(section.id)}
                            hoverContent="Delete"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 9.32876L1.60303 15.7261C1.42838 15.9005 1.20886 15.9898 0.944477 15.994C0.680301 15.998 0.456792 15.9087 0.273949 15.7261C0.0913163 15.5432 0 15.3217 0 15.0615C0 14.8013 0.0913163 14.5798 0.273949 14.397L6.67124 8L0.273949 1.60303C0.0995127 1.42838 0.010193 1.20886 0.00598975 0.944478C0.00199664 0.680302 0.0913163 0.456792 0.273949 0.273949C0.456792 0.0913163 0.678305 0 0.938488 0C1.19867 0 1.42018 0.0913163 1.60303 0.273949L8 6.67124L14.397 0.273949C14.5716 0.0995127 14.7911 0.010193 15.0555 0.00598975C15.3197 0.00199664 15.5432 0.0913163 15.7261 0.273949C15.9087 0.456792 16 0.678305 16 0.938488C16 1.19867 15.9087 1.42018 15.7261 1.60303L9.32876 8L15.7261 14.397C15.9005 14.5716 15.9898 14.7911 15.994 15.0555C15.998 15.3197 15.9087 15.5432 15.7261 15.7261C15.5432 15.9087 15.3217 16 15.0615 16C14.8013 16 14.5798 15.9087 14.397 15.7261L8 9.32876Z"
                                fill="#242220"
                                fill-opacity="0.2"
                              />
                            </svg>
                          </Icon>
                        </div>

                        <div className={styles.editIcon}>
                          <Icon
                            onClick={() => onEdit && onEdit(section.id)}
                            hoverContent="Edit"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.92819 0.513214L8.60331 1.83799L12.1619 5.39627L13.4867 4.07149C14.1711 3.38721 14.1711 2.27867 13.4867 1.59438L12.4082 0.513214C11.7239 -0.171071 10.6153 -0.171071 9.93092 0.513214H9.92819ZM7.98467 2.45658L1.6039 8.83959C1.31921 9.12425 1.11118 9.47735 0.996207 9.86328L0.0271838 13.1561C-0.04125 13.3887 0.0217091 13.6378 0.191425 13.8075C0.361141 13.9772 0.61024 14.0402 0.840177 13.9745L4.13321 13.0055C4.51918 12.8906 4.8723 12.6825 5.15698 12.3979L11.5432 6.01486L7.98467 2.45658Z"
                                fill="black"
                              />
                            </svg>
                          </Icon>
                        </div>
                      </div>
                    )}
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
                    {isEditing && showPopup && (
                      <div className={styles.editButtons}>
                        <div className={styles.deleteIcon}>
                          <Icon
                            onClick={() => onDelete && onDelete(section.id)}
                            hoverContent="Delete"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 9.32876L1.60303 15.7261C1.42838 15.9005 1.20886 15.9898 0.944477 15.994C0.680301 15.998 0.456792 15.9087 0.273949 15.7261C0.0913163 15.5432 0 15.3217 0 15.0615C0 14.8013 0.0913163 14.5798 0.273949 14.397L6.67124 8L0.273949 1.60303C0.0995127 1.42838 0.010193 1.20886 0.00598975 0.944478C0.00199664 0.680302 0.0913163 0.456792 0.273949 0.273949C0.456792 0.0913163 0.678305 0 0.938488 0C1.19867 0 1.42018 0.0913163 1.60303 0.273949L8 6.67124L14.397 0.273949C14.5716 0.0995127 14.7911 0.010193 15.0555 0.00598975C15.3197 0.00199664 15.5432 0.0913163 15.7261 0.273949C15.9087 0.456792 16 0.678305 16 0.938488C16 1.19867 15.9087 1.42018 15.7261 1.60303L9.32876 8L15.7261 14.397C15.9005 14.5716 15.9898 14.7911 15.994 15.0555C15.998 15.3197 15.9087 15.5432 15.7261 15.7261C15.5432 15.9087 15.3217 16 15.0615 16C14.8013 16 14.5798 15.9087 14.397 15.7261L8 9.32876Z"
                                fill="#242220"
                                fill-opacity="0.2"
                              />
                            </svg>
                          </Icon>
                        </div>

                        <div className={styles.editIcon}>
                          <Icon
                            onClick={() => onEdit && onEdit(section.id)}
                            hoverContent="Edit"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.92819 0.513214L8.60331 1.83799L12.1619 5.39627L13.4867 4.07149C14.1711 3.38721 14.1711 2.27867 13.4867 1.59438L12.4082 0.513214C11.7239 -0.171071 10.6153 -0.171071 9.93092 0.513214H9.92819ZM7.98467 2.45658L1.6039 8.83959C1.31921 9.12425 1.11118 9.47735 0.996207 9.86328L0.0271838 13.1561C-0.04125 13.3887 0.0217091 13.6378 0.191425 13.8075C0.361141 13.9772 0.61024 14.0402 0.840177 13.9745L4.13321 13.0055C4.51918 12.8906 4.8723 12.6825 5.15698 12.3979L11.5432 6.01486L7.98467 2.45658Z"
                                fill="black"
                              />
                            </svg>
                          </Icon>
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else if (
                section.sectionType == "Awards" ||
                section.sectionType == "Publications"
              ) {
                return (
                  <div key={section.id} className={styles.sectionCard}>
                    <div className={styles.sectionTitle}>{section.title}</div>

                    <div className={styles.HeadlineAward}>
                      {section.institution}, {section.from} {section.to}
                    </div>

                    <div
                      className={styles.sectionDescription}
                      style={{ margin: 0 }}
                    >
                      <Draft show border content={section.description} />
                    </div>
                    {isEditing && showPopup && (
                      <div className={styles.editButtons}>
                        <div className={styles.deleteIcon}>
                          <Icon
                            onClick={() => onDelete && onDelete(section.id)}
                            hoverContent="Delete"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 9.32876L1.60303 15.7261C1.42838 15.9005 1.20886 15.9898 0.944477 15.994C0.680301 15.998 0.456792 15.9087 0.273949 15.7261C0.0913163 15.5432 0 15.3217 0 15.0615C0 14.8013 0.0913163 14.5798 0.273949 14.397L6.67124 8L0.273949 1.60303C0.0995127 1.42838 0.010193 1.20886 0.00598975 0.944478C0.00199664 0.680302 0.0913163 0.456792 0.273949 0.273949C0.456792 0.0913163 0.678305 0 0.938488 0C1.19867 0 1.42018 0.0913163 1.60303 0.273949L8 6.67124L14.397 0.273949C14.5716 0.0995127 14.7911 0.010193 15.0555 0.00598975C15.3197 0.00199664 15.5432 0.0913163 15.7261 0.273949C15.9087 0.456792 16 0.678305 16 0.938488C16 1.19867 15.9087 1.42018 15.7261 1.60303L9.32876 8L15.7261 14.397C15.9005 14.5716 15.9898 14.7911 15.994 15.0555C15.998 15.3197 15.9087 15.5432 15.7261 15.7261C15.5432 15.9087 15.3217 16 15.0615 16C14.8013 16 14.5798 15.9087 14.397 15.7261L8 9.32876Z"
                                fill="#242220"
                                fill-opacity="0.2"
                              />
                            </svg>
                          </Icon>
                        </div>

                        <div className={styles.editIcon}>
                          <Icon
                            onClick={() => onEdit && onEdit(section.id)}
                            hoverContent="Edit"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.92819 0.513214L8.60331 1.83799L12.1619 5.39627L13.4867 4.07149C14.1711 3.38721 14.1711 2.27867 13.4867 1.59438L12.4082 0.513214C11.7239 -0.171071 10.6153 -0.171071 9.93092 0.513214H9.92819ZM7.98467 2.45658L1.6039 8.83959C1.31921 9.12425 1.11118 9.47735 0.996207 9.86328L0.0271838 13.1561C-0.04125 13.3887 0.0217091 13.6378 0.191425 13.8075C0.361141 13.9772 0.61024 14.0402 0.840177 13.9745L4.13321 13.0055C4.51918 12.8906 4.8723 12.6825 5.15698 12.3979L11.5432 6.01486L7.98467 2.45658Z"
                                fill="black"
                              />
                            </svg>
                          </Icon>
                        </div>
                      </div>
                    )}
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
                      {isEditing && showPopup && (
                        <div className={styles.editButtons}>
                          <div className={styles.deleteIcon}>
                            <Icon
                              onClick={() => onDelete && onDelete(section.id)}
                              hoverContent="Delete"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 9.32876L1.60303 15.7261C1.42838 15.9005 1.20886 15.9898 0.944477 15.994C0.680301 15.998 0.456792 15.9087 0.273949 15.7261C0.0913163 15.5432 0 15.3217 0 15.0615C0 14.8013 0.0913163 14.5798 0.273949 14.397L6.67124 8L0.273949 1.60303C0.0995127 1.42838 0.010193 1.20886 0.00598975 0.944478C0.00199664 0.680302 0.0913163 0.456792 0.273949 0.273949C0.456792 0.0913163 0.678305 0 0.938488 0C1.19867 0 1.42018 0.0913163 1.60303 0.273949L8 6.67124L14.397 0.273949C14.5716 0.0995127 14.7911 0.010193 15.0555 0.00598975C15.3197 0.00199664 15.5432 0.0913163 15.7261 0.273949C15.9087 0.456792 16 0.678305 16 0.938488C16 1.19867 15.9087 1.42018 15.7261 1.60303L9.32876 8L15.7261 14.397C15.9005 14.5716 15.9898 14.7911 15.994 15.0555C15.998 15.3197 15.9087 15.5432 15.7261 15.7261C15.5432 15.9087 15.3217 16 15.0615 16C14.8013 16 14.5798 15.9087 14.397 15.7261L8 9.32876Z"
                                  fill="#242220"
                                  fill-opacity="0.2"
                                />
                              </svg>
                            </Icon>
                          </div>

                          <div className={styles.editIcon}>
                            <Icon
                              onClick={() => onEdit && onEdit(section.id)}
                              hoverContent="Edit"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.92819 0.513214L8.60331 1.83799L12.1619 5.39627L13.4867 4.07149C14.1711 3.38721 14.1711 2.27867 13.4867 1.59438L12.4082 0.513214C11.7239 -0.171071 10.6153 -0.171071 9.93092 0.513214H9.92819ZM7.98467 2.45658L1.6039 8.83959C1.31921 9.12425 1.11118 9.47735 0.996207 9.86328L0.0271838 13.1561C-0.04125 13.3887 0.0217091 13.6378 0.191425 13.8075C0.361141 13.9772 0.61024 14.0402 0.840177 13.9745L4.13321 13.0055C4.51918 12.8906 4.8723 12.6825 5.15698 12.3979L11.5432 6.01486L7.98467 2.45658Z"
                                  fill="black"
                                />
                              </svg>
                            </Icon>
                          </div>
                        </div>
                      )}
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
