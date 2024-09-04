"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./AddSocialMedia.module.css";
import EditProfileInput from "./EditProfileInput";
import Button from "../general/Button";
import { SocialMedia } from "@prisma/client";
import Dropdown from "../general/Dropdown";
import Input from "../general/Input";

interface CustomSocialMedia {
  socialMediaType: string;
  socialMediaUrl: string;
  platformName: string;
  username: string;
}

interface Props {
  profileType: string;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  socialMedias: CustomSocialMedia[];
  setSocialMedias: React.Dispatch<React.SetStateAction<CustomSocialMedia[]>>;
  modalRef?: React.RefObject<HTMLDivElement>;
  editingIndex?: number | null;
}

const AddSocialMedia: React.FC<Props> = ({
  profileType,
  setPopup,
  socialMedias,
  setSocialMedias,
  modalRef,
  editingIndex,
}) => {
  const [platform, setPlatform] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [platformName, setPlatformName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const internalModalRef = useRef<HTMLDivElement>(null);
  const effectiveModalRef = modalRef || internalModalRef;

  useEffect(() => {
    if (editingIndex !== undefined && editingIndex !== null) {
      const editingItem = socialMedias[editingIndex];
      setPlatform(editingItem.socialMediaType);
      setUrl(editingItem.socialMediaUrl);
      setPlatformName(editingItem.platformName);
      setUsername(editingItem.username);
    }
  }, [editingIndex, socialMedias]);

  const SocialTypes = [
    { value: "Arena", label: "Are.na" },
    { value: "Facebook", label: "Facebook" },
    { value: "Figma", label: "Figma" },
    { value: "Github", label: "Github" },
    { value: "Gitlab", label: "Gitlab" },
    { value: "Instagram", label: "Instagram" },
    { value: "Linkedin", label: "Linkedin" },
    { value: "Substack", label: "Substack" },
    { value: "Telegram", label: "Telegram" },
    { value: "Tiktok", label: "Tiktok" },
    { value: "X", label: "X" },
    { value: "Youtube", label: "Youtube" },
    { value: "Custom", label: "Custom" },
  ];

  const Add = () => {
    const Item: CustomSocialMedia = {
      socialMediaType: platform,
      socialMediaUrl: url,
      platformName,
      username,
    };
    if (editingIndex !== undefined && editingIndex !== null) {
      const updatedSocialMedias = [...socialMedias];
      updatedSocialMedias[editingIndex] = Item;
      setSocialMedias(updatedSocialMedias);
    } else {
      setSocialMedias([...socialMedias, Item]);
    }
    setPlatform("");
    setPlatformName("");
    setUsername("");
    setUrl("");
    setPopup(false);
  };

  useEffect(() => {
    if (!effectiveModalRef?.current) return; // Eğer modalRef mevcut değilse, herhangi bir işlem yapmadan çık

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        effectiveModalRef.current &&
        !effectiveModalRef.current.contains(event.target as Node)
      ) {
        setPopup(false); // Dışarı tıklanınca modal kapanır
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [effectiveModalRef, setPopup]);

  return (
    <div className={styles.SocialPopup} ref={effectiveModalRef}>
      <div className={styles.line}>
        <div className={styles.Column}>
          <Dropdown
            id="SocialMediaType"
            list={SocialTypes}
            placeholder="Platform"
            value={platform}
            setValue={setPlatform}
          />
        </div>

        <div className={styles.Column}>
          <Input
            id="url"
            type="text"
            required
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>

      {platform == "Custom" && (
        <div className={styles.line}>
          <div className={styles.Column}>
            <Input
              id="platformname"
              type="text"
              required
              placeholder="Platform Name"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
            />
          </div>

          <div className={styles.Column}>
            <Input
              id="username"
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className={styles.ButtonGroup}>
        <Button
          text="Cancel"
          onClick={() => setPopup(false)}
          backgroundColor="#FFFFFF"
          textColor="#000000"
          fontSize={14}
          fontWeight={400}
        />

        <Button
          text="Save"
          onClick={() => Add()}
          fontSize={14}
          fontWeight={400}
          paddingTop={12}
          paddingBottom={12}
          paddingLeft={27}
          paddingRight={28}
        />
      </div>
    </div>
  );
};

export default AddSocialMedia;
