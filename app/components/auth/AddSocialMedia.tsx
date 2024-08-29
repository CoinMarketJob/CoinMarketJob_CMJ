"use client";
import React, { useState } from "react";
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
}

const AddSocialMedia: React.FC<Props> = ({
  profileType,
  setPopup,
  socialMedias,
  setSocialMedias
}) => {
  const [platform, setPlatform] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [platformName, setPlatformName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

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
      username
    }
    setSocialMedias([...socialMedias, Item]);
    setPlatform("");
    setPlatformName("");
    setUsername("");
    setUrl("");
    setPopup(false);
  }

  return (
    <div className={styles.SocialPopup}>
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
