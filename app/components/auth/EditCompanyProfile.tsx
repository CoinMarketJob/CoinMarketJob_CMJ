"use client";
import React, { useEffect, useState } from "react";
import styles from "./EditCompanyProfile.module.css";
import Image from "next/image";
import EditProfileInput from "./EditProfileInput";
import EditProfileDraft from "./EditProfileDraft";
import { JSONContent } from "@tiptap/react";
import Icon from "../general/Icon";
import SocialMediaItem from "./SocialMediaItem";
import { SocialMedia } from "@prisma/client";
import AddSocialMedia from "./AddSocialMedia";
import Button from "../general/Button";
const defaultAvatarImage = "/PlaceholderCompanyProfile.png";

interface Profile {
  id: number;
  companyName: string;
  headline: string;
  siteUrl: string;
  about: JSONContent;
  logoURL: string;
  socialMedias: SocialMedia[];
}

interface props {
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
}

const EditCompanyProfile: React.FC<props> = ({ setEditProfile }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [about, setAbout] = useState<JSONContent>();
  const [avatar, setAvatar] = useState<string>(defaultAvatarImage);

  const [profile, setProfile] = useState<Profile | null>(null);

  const [socialPopup, setSocialPopup] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [oldLogo, setOldLogo] = useState("");
  const [changeLogo, setChangeLogo] = useState<boolean>(false);

  const closeTest = () => {
    console.log("Close");
  };

  const AboutChange = (content: JSONContent) => {
    setAbout(content);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          const url = URL.createObjectURL(file);
          setAvatar(url); // URL.string olarak ayarlanmış
          setChangeLogo(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("avatarInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/companyprofile/get/");
        const data: Profile = await response.json();
        console.log(data);
        setProfile(data);
        setCompanyName(data.companyName);
        setHeadline(data.headline);
        setSite(data.siteUrl);
        setAbout(data.about as JSONContent);
        setOldLogo(data.logoURL);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    }

    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("/api/companyprofile/get/");
      const data = await response.json();
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
    }
  }

  const Done = async () => {
    let logoLink = "";
    try {
      const uploadLogo = async () => {
        if (imageFile && changeLogo) {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("Content-Type", imageFile.type);

          const response = await fetch("/api/profileimage/", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            logoLink = data.url;
          } else {
            console.error("Error uploading cover letter:", response.statusText);
          }
        }
      };

      await Promise.all([uploadLogo()]);
      const profileData = {
        companyName,
        headline,
        siteUrl: site,
        about,
        logoLink,
      };

      const response = await fetch("/api/companyprofile/", {
        method: "POST",
        body: JSON.stringify(profileData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data)
        setEditProfile(false);
      } else {
        console.error("Error applying for job:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Image
          src={oldLogo || avatar}
          width={140}
          height={140}
          alt="Avatar"
          className={styles.LogoImage}
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
          label="Company Name"
          placeholder="Company Name"
          value={companyName}
          setValue={setCompanyName}
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
        <EditProfileDraft
          ContentType="About"
          close={closeTest}
          onChange={AboutChange}
        />
      </div>

      <div className={styles.SocialMedias}>
        {socialPopup && profile && (
          <AddSocialMedia
            profileType="Company"
            profileId={profile.id} // ID'nin doğru türde olduğundan emin olun
            setPopup={setSocialPopup}
            fetchData={fetchData}
          />
        )}

        {profile?.socialMedias.map((item: SocialMedia, index: number) => (
          <SocialMediaItem
            key={index}
            type={item.socialMediaType}
            url={item.socialMediaUrl}
          />
        ))}

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

      <div className={styles.Done}>
        <Button
          text="Done"
          onClick={Done}
          fontSize={14}
          fontWeight={500}
          paddingTop={12}
          paddingBottom={12}
          paddingLeft={26}
          paddingRight={26}
        />
      </div>
    </div>
  );
};

export default EditCompanyProfile;
