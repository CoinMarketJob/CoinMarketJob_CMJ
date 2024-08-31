"use client";
import React, { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import styles from "./EditProfile.module.css";
import Image from "next/image";
import EditProfileInput from "./EditProfileInput";
import EditProfileDraft from "./EditProfileDraft";
import { JSONContent } from "@tiptap/react";
import Icon from "../general/Icon";
import AddSocialMedia from "./AddSocialMedia";
import SocialMediaItem from "./SocialMediaItem";
import { ProfileSection, SocialMedia } from "@prisma/client";
import AddProfileSectionPopup from "./AddProfileSectionPopup";
import CollapsedSocialMedia from "./CollapsedSocialMedia";
import Button from "../general/Button";
import ProfileSections from "./ProfileSections";
const defaultAvatarImage = "/PlaceholderCompanyProfile.png";

interface Profile {
  id: string;
  jobTitle: string;
  headline: string;
  location: string;
  siteUrl: string;
  about: JSONContent;
  socialMedias: SocialMedia[];
  sectionsOrder: string;
}

interface Section {
  id: number;
}

interface CustomSocialMedia {
  socialMediaType: string;
  socialMediaUrl: string;
  platformName: string;
  username: string;
}

const EditProfile = () => {
  const [nameSurname, setNameSurname] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [about, setAbout] = useState<JSONContent>();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  const [socialPopup, setSocialPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [sectionPopup, setSectionPopup] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("WorkExperience");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [changeLogo, setChangeLogo] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<string>(defaultAvatarImage);
  const [socialMedias, setSocialMedias] = useState<CustomSocialMedia[]>([]);
  const [profileSections, setProfileSections] = useState<ProfileSection[]>([]);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);

  const visibleSocialMediaCount = 3;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetchData() {
      try {
        const response = await fetch("/api/profile/get/");
        const data: Profile = await response.json();
        console.log(data);
        setProfile(data);
        setJobTitle(data.jobTitle);
        setHeadline(data.headline);
        setLocation(data.location);
        setSite(data.siteUrl);
        setAbout(data.about);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const defaultSections = [
    { id: "WorkExperience", label: "Work Experience" },
    { id: "Volunteering", label: "Volunteering" },
    { id: "Education", label: "Education" },
    { id: "Certifications", label: "Certifications" },
    { id: "Projects", label: "Projects" },
    { id: "Publications", label: "Publications" },
    { id: "Awards", label: "Awards" },
  ];

  const [sections, setSections] = useState(defaultSections);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/profile/get/");
        const data = await response.json();
        console.log(data);
        setProfile(data);
        setNameSurname(data.nameSurname);
        setJobTitle(data.jobTitle);
        setHeadline(data.headline);
        setLocation(data.location);
        setSite(data.siteUrl);
        setAbout(data.about);
        setSocialMedias(data.socialMedias);
        setProfileSections(data.section);
        setAvatar(data.logoURL);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (profile && profile.section) {
      setProfileSections(profile.section);
    }
  }, [profile]);

  const handleAddSection = (newSection: ProfileSection) => {
    setProfileSections((prevSections) => [...prevSections, newSection]);
    console.log("Added");
    setShowAddPopup(false);
    setSectionPopup(false);
  };

  const handleEditSection = (sectionId: number) => {
    setEditingSectionId(sectionId);
    setShowAddPopup(false);
    setSectionPopup(false);
  };

  const handleUpdateSection = (updatedSection: ProfileSection) => {
    setProfileSections((prevSections) => {
      const updatedSections = prevSections.map((section) =>
        section.id === editingSectionId
          ? { ...section, ...updatedSection }
          : section
      );
      console.log("Updated sections:", updatedSections);
      return updatedSections;
    });
    setEditingSectionId(null);
    setShowAddPopup(false);
    setSectionPopup(false);
  };

  const handleDeleteSection = (sectionId: number) => {
    setProfileSections(
      profileSections.filter((section) => section.id !== sectionId)
    );
  };

  const Done = async () => {
    try {
      const profileData = {
        nameSurname,
        jobTitle,
        headline,
        location,
        siteUrl: site,
        about,
        socialMedias,
        sections: profileSections,
        avatar,
      };

      console.log(profile);

      const response = await fetch("/api/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      console.log("Başarılı");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const updateSectionOrder = useCallback(async (sections: Section[]) => {
    const newOrder = sections.map((section) => section.id);
    console.log("Updated section order:", newOrder);

    try {
      const response = await fetch("/api/profile/update-sections-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sectionsOrder: JSON.stringify(newOrder) }),
      });

      if (!response.ok) {
        throw new Error("Failed to update section order");
      }
    } catch (error) {
      console.error("Error updating section order:", error);
    }
  }, []);

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) {
        return;
      }

      const newItems = Array.from(profileSections);
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);

      setProfileSections(newItems);
    },
    [profileSections, updateSectionOrder]
  );

  const AddElement = (type: string) => {
    setShowAddPopup(true);
    setPopupType(type);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);

      try {
        const uploadedImageUrl = await uploadImageToS3(file);
        setAvatar(uploadedImageUrl);
        setChangeLogo(true);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const uploadImageToS3 = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/profileimage/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("avatarInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      {loading ? (
        <div className={styles.loadingOverlay}></div>
      ) : (
        <div className={styles.container}>
          <div className={styles.avatar}>
            <Image
              src={avatar}
              width={140}
              height={140}
              alt="Avatar"
              className={styles.avatarImage}
            />
            <div className={styles.EditAvatar} onClick={triggerFileInput}>
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
            </div>
            <input
              type="file"
              id="avatarInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <div className={styles.InputGroup} style={{ marginTop: "8px" }}>
            <EditProfileInput
              label="Name Surname"
              placeholder="Erbil Can Artun"
              value={nameSurname}
              setValue={setNameSurname}
            />
          </div>

          <div className={styles.InputGroup}>
            <EditProfileInput
              label="What do you do?"
              placeholder="Senior Solidity Developer"
              value={jobTitle}
              setValue={setJobTitle}
            />
          </div>
          <div className={styles.InputGroup}>
            <EditProfileInput
              label="Location"
              placeholder="Istanbul, Turkey"
              value={location}
              setValue={setLocation}
            />
          </div>
          <div className={styles.InputGroup}>
            <EditProfileInput
              label="Headline"
              placeholder="Senior Solidity Developer in Istanbul, Turkey "
              value={headline}
              setValue={setHeadline}
            />
          </div>
          <div className={styles.Site}>
            <input
              className={styles.SiteInput}
              type="text"
              placeholder="www.site.com"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            />
          </div>

          <div className={styles.About}>
            <span className={styles.AboutText}>About</span>
            <EditProfileDraft
              ContentType="About"
              content={about}
              onChange={(content: JSONContent) => setAbout(content)}
            />
          </div>

          <div className={styles.SocialMedias}>
            {socialPopup && (
              <AddSocialMedia
                profileType="Job Seeker"
                setPopup={setSocialPopup}
                socialMedias={socialMedias}
                setSocialMedias={setSocialMedias}
              />
            )}

            {socialMedias
              .slice(0, visibleSocialMediaCount)
              .map((item: CustomSocialMedia, index: number) => (
                <SocialMediaItem
                  key={index}
                  type={item.socialMediaType}
                  url={item.socialMediaUrl}
                />
              ))}

            {socialMedias.length > visibleSocialMediaCount && (
              <CollapsedSocialMedia
                socialMedias={socialMedias.slice(visibleSocialMediaCount)}
              />
            )}

            <Icon
              onClick={(e) => setSocialPopup(true)}
              hoverSize={40}
              hoverContent="Add Social Media"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9398 11.9396L11.94 20.9865C11.9399 21.2333 11.8478 21.4517 11.6638 21.6416C11.4799 21.8313 11.2587 21.9261 11.0002 21.9263C10.7418 21.9261 10.5206 21.8341 10.3366 21.6501C10.1526 21.4661 10.0606 21.2449 10.0604 20.9865L10.0607 11.9396L1.01375 11.9398C0.766908 11.9397 0.548527 11.8476 0.358606 11.6636C0.168981 11.4796 0.0740943 11.2584 0.0739457 11C0.0740943 10.7416 0.166157 10.5204 0.350134 10.3364C0.534112 10.1524 0.755315 10.0603 1.01375 10.0602L10.0607 10.0604L10.0604 1.01351C10.0606 0.766676 10.1526 0.548295 10.3366 0.358374C10.5206 0.168749 10.7418 0.0738627 11.0002 0.0737138C11.2587 0.0738625 11.4799 0.165926 11.6638 0.349903C11.8478 0.53388 11.9399 0.755084 11.94 1.01351L11.9398 10.0604L20.9867 10.0602C21.2336 10.0603 21.4519 10.1524 21.6419 10.3364C21.8315 10.5204 21.9264 10.7416 21.9265 11C21.9264 11.2584 21.8343 11.4796 21.6503 11.6636C21.4664 11.8476 21.2451 11.9397 20.9867 11.9398L11.9398 11.9396Z"
                  fill="#999999"
                  className="svg-icon"
                  fill-opacity="0.6"
                />
              </svg>
            </Icon>
          </div>

          <div className={styles.LineDiv}>
            <div className={styles.Line}></div>
          </div>

          <div className={styles.ProfileSections}>
            <ProfileSections
              profile={{ ...profile, section: profileSections }}
              isEditing={true}
              onEdit={handleEditSection}
              onDelete={handleDeleteSection}
            />
          </div>

          <div className={styles.AddSection}>
            <Icon
              onClick={() => setSectionPopup(!sectionPopup)}
              hoverSize={50}
              hoverContent="Add Profile Section"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3799 18.7231L18.3803 32.2935C18.38 32.6637 18.2419 32.9913 17.966 33.2762C17.69 33.5606 17.3582 33.7029 16.9706 33.7032C16.5829 33.7029 16.2511 33.5648 15.9751 33.2889C15.6992 33.0129 15.5611 32.6811 15.5609 32.2935L15.5612 18.7231L1.99083 18.7234C1.62058 18.7232 1.29301 18.5851 1.00812 18.3091C0.723687 18.0332 0.581356 17.7014 0.581133 17.3137C0.581356 16.9261 0.719451 16.5943 0.995416 16.3183C1.27138 16.0423 1.60319 15.9042 1.99083 15.904L15.5612 15.9044L15.5609 2.33399C15.5611 1.96373 15.6992 1.63616 15.9751 1.35128C16.2511 1.06684 16.5829 0.924515 16.9706 0.924291C17.3582 0.924514 17.69 1.06261 17.966 1.33858C18.2419 1.61454 18.38 1.94635 18.3803 2.33399L18.3799 15.9044L31.9503 15.904C32.3205 15.9042 32.6481 16.0423 32.933 16.3183C33.2174 16.5943 33.3598 16.9261 33.36 17.3137C33.3598 17.7014 33.2217 18.0332 32.9457 18.3091C32.6697 18.5851 32.3379 18.7232 31.9503 18.7234L18.3799 18.7231Z"
                  fill="#999999"
                  fill-opacity="0.6"
                />
              </svg>
            </Icon>

            <div
              className={styles.SectionPopup}
              style={{ display: !sectionPopup ? "none" : "" }}
            >
              {sections.map((item, index) => (
                <div className={styles.ElementDiv}>
                  <Icon onClick={() => AddElement(item.id)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7216 11.1359L10.7218 19.0519C10.7217 19.2679 10.6411 19.459 10.4802 19.6251C10.3192 19.7911 10.1256 19.8741 9.89949 19.8742C9.67337 19.8741 9.47982 19.7935 9.31884 19.6326C9.15786 19.4716 9.0773 19.278 9.07717 19.0519L9.07737 11.1359L1.16132 11.136C0.945336 11.1359 0.754253 11.0554 0.588072 10.8944C0.422151 10.7334 0.339125 10.5398 0.338994 10.3137C0.339125 10.0876 0.41968 9.89404 0.58066 9.73306C0.74164 9.57208 0.935193 9.49153 1.16132 9.4914L9.07736 9.49159L9.07717 1.57555C9.0773 1.35956 9.15785 1.16848 9.31884 1.0023C9.47982 0.836376 9.67337 0.75335 9.89949 0.75322C10.1256 0.75335 10.3192 0.833906 10.4802 0.994886C10.6411 1.15587 10.7217 1.34942 10.7218 1.57555L10.7216 9.49159L18.6377 9.4914C18.8537 9.49153 19.0447 9.57208 19.2109 9.73306C19.3768 9.89404 19.4599 10.0876 19.46 10.3137C19.4599 10.5398 19.3793 10.7334 19.2183 10.8944C19.0573 11.0554 18.8638 11.1359 18.6377 11.136L10.7216 11.1359Z"
                        fill="#999999"
                        fill-opacity="0.6"
                      />
                    </svg>
                  </Icon>
                  <div className={styles.SectionText}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.PopupContainerDiv}>
            <div
              className={styles.PopupContainer}
              style={{ display: !showAddPopup ? "none" : "" }}
            >
              <AddProfileSectionPopup
                type={popupType}
                setShowAddPopup={setShowAddPopup}
                profileId={Number(profile?.id)}
                onAdd={handleAddSection}
                onUpdate={handleUpdateSection}
                editingSection={
                  editingSectionId
                    ? profileSections.find((s) => s.id === editingSectionId)
                    : undefined
                }
              />
            </div>
          </div>

          <div className={styles.ButtonDiv}>
            <Button text="Done" onClick={() => Done()} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
