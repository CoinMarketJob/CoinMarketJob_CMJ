"use client";
import React, { useState } from "react";
import styles from "./AddSocialMedia.module.css";
import EditProfileInput from "./EditProfileInput";
import Button from "../general/Button";

interface Props {
  profileType: string;
  profileId: number;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
}

const AddSocialMedia: React.FC<Props> = ({
  profileId,
  profileType,
  setPopup,
  fetchData
}) => {
  const [socialMediaType, setSocialMediaType] = useState("");
  const [socialMediaUrl, setSocialMediaUrl] = useState("");
  const [state, setState] = useState(0);

  const SocialIconClick = (SocialMediaType: string) => {
    setSocialMediaType(SocialMediaType);
    setState(1);
  };

  const AddSocialMedia = async () => {
    try {
      const data = {
        type: socialMediaType,
        url: socialMediaUrl,
        profileId,
      };
      var apiURL = "";

      if(profileType == "Company") {
        apiURL = "/api/companyprofile/socialmedia/";
      }else {
        apiURL = "/api/profile/socialmedia/";
      }

      const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setPopup(false);
        fetchData();
      } else {
        console.error("Error Posting for job:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.SocialPopup}>
      {state == 0 ? (
        <div className={styles.SelectSocialMedia}>
          <svg
            onClick={() => SocialIconClick("X")}
            className={styles.SocialIcon}
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.9904 14.5005C28.9904 21.8239 23.5635 27.8783 16.5134 28.8608C15.8542 28.9522 15.1798 29 14.4952 29C13.705 29 12.929 28.937 12.1733 28.8151C5.27154 27.7036 0 21.7172 0 14.5005C0 6.49231 6.4904 0 14.4962 0C22.5021 0 28.9925 6.49231 28.9925 14.5005H28.9904Z"
              fill="#999999"
            />
            <path
              d="M5.87954 6.39581L12.5649 15.3367L5.83789 22.6063H7.35232L13.2424 16.242L18.001 22.6063H23.1537L16.0925 13.1624L22.3544 6.39581H20.8399L15.416 12.2572L11.0333 6.39581H5.88054H5.87954ZM8.10597 7.51139H10.4726L20.9253 21.4907H18.5587L8.10597 7.51139Z"
              fill="white"
            />
          </svg>

          <svg
            className={styles.SocialIcon}
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => SocialIconClick("LinkedIn")}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.5 0C6.49187 0 0 6.49187 0 14.5C0 22.5081 6.49187 29 14.5 29C22.5081 29 29 22.5081 29 14.5C29 6.49187 22.5081 0 14.5 0ZM6.96098 12.0095H10.247V21.8827H6.96098V12.0095ZM10.4634 8.95538C10.4421 7.98733 9.74983 7.25 8.62571 7.25C7.50158 7.25 6.76667 7.98733 6.76667 8.95538C6.76667 9.90338 7.47986 10.6619 8.58305 10.6619H8.60405C9.74983 10.6619 10.4634 9.90338 10.4634 8.95538ZM18.3142 11.7777C20.4765 11.7777 22.0976 13.1891 22.0976 16.2217L22.0975 21.8827H18.8116V16.6005C18.8116 15.2738 18.3361 14.3684 17.1466 14.3684C16.2387 14.3684 15.698 14.9788 15.4605 15.5683C15.3736 15.7795 15.3523 16.0739 15.3523 16.3689V21.8829H12.0659C12.0659 21.8829 12.1092 12.9362 12.0659 12.0098H15.3523V13.4082C15.7884 12.736 16.5695 11.7777 18.3142 11.7777Z"
              fill="#999999"
            />
          </svg>

          <svg
            className={styles.SocialIcon}
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => SocialIconClick("GitHub")}
          >
            <path
              d="M14.5259 0.108704C6.53363 0.108704 0.0527344 6.6989 0.0527344 14.829C0.0527344 21.3329 4.19973 26.8507 9.95036 28.7972C10.6737 28.9335 10.9392 28.4779 10.9392 28.089C10.9392 27.738 10.9258 26.5784 10.9196 25.3484C6.89314 26.2389 6.04351 23.6116 6.04351 23.6116C5.38514 21.9101 4.43653 21.4577 4.43653 21.4577C3.12338 20.544 4.53551 20.5628 4.53551 20.5628C5.98887 20.6664 6.75413 22.0798 6.75413 22.0798C8.04499 24.3302 10.1399 23.6796 10.9658 23.3034C11.0957 22.3523 11.4708 21.7024 11.8847 21.335C8.67005 20.9628 5.29071 19.7006 5.29071 14.0601C5.29071 12.453 5.85609 11.1398 6.78193 10.1089C6.63166 9.73792 6.13626 8.24095 6.92214 6.21332C6.92214 6.21332 8.1375 5.81768 10.9033 7.72222C12.0578 7.39606 13.2959 7.2325 14.5259 7.22689C15.7559 7.2325 16.995 7.39606 18.1516 7.72222C20.914 5.81768 22.1277 6.21332 22.1277 6.21332C22.9155 8.24095 22.4199 9.73792 22.2696 10.1089C23.1976 11.1398 23.7592 12.453 23.7592 14.0601C23.7592 19.714 20.3733 20.9589 17.1505 21.3233C17.6696 21.7802 18.1322 22.676 18.1322 24.0494C18.1322 26.0187 18.1154 27.604 18.1154 28.089C18.1154 28.4808 18.3759 28.9398 19.1096 28.7952C24.8571 26.8466 28.9988 21.3307 28.9988 14.829C28.9988 6.6989 22.5189 0.108704 14.5259 0.108704Z"
              fill="#999999"
            />
            <path
              d="M5.53409 21.2439C5.50222 21.3173 5.38909 21.339 5.28604 21.2887C5.18106 21.2407 5.1221 21.141 5.15614 21.0676C5.18729 20.9923 5.30066 20.9716 5.40539 21.0216C5.51061 21.0698 5.57052 21.1705 5.53409 21.2439Z"
              fill="#999999"
            />
            <path
              d="M6.12075 21.9088C6.05173 21.9739 5.9168 21.9437 5.82524 21.8408C5.73057 21.7382 5.71284 21.601 5.78282 21.5349C5.854 21.4698 5.98486 21.5003 6.07977 21.6029C6.17444 21.7068 6.19289 21.843 6.12075 21.9088Z"
              fill="#999999"
            />
            <path
              d="M6.69134 22.7567C6.60266 22.8193 6.45766 22.7606 6.36803 22.6297C6.27935 22.4988 6.27935 22.3418 6.36995 22.2789C6.45982 22.216 6.60266 22.2726 6.6935 22.4025C6.78194 22.5354 6.78194 22.6926 6.69134 22.7567Z"
              fill="#999999"
            />
            <path
              d="M7.47313 23.5758C7.3938 23.6647 7.22484 23.6408 7.10117 23.5194C6.97462 23.4007 6.93939 23.2323 7.01896 23.1433C7.09925 23.0541 7.26917 23.0792 7.3938 23.1996C7.51939 23.3181 7.55774 23.4878 7.47313 23.5758Z"
              fill="#999999"
            />
            <path
              d="M8.5517 24.0513C8.51671 24.1666 8.35397 24.219 8.19004 24.17C8.02634 24.1196 7.91921 23.9845 7.95229 23.868C7.98632 23.752 8.14977 23.6974 8.31491 23.7498C8.47836 23.8 8.58573 23.9341 8.5517 24.0513Z"
              fill="#999999"
            />
            <path
              d="M9.7362 24.1396C9.74027 24.261 9.60127 24.3617 9.42918 24.3636C9.25614 24.3678 9.11618 24.2695 9.11426 24.1501C9.11426 24.0275 9.25015 23.9278 9.42319 23.9248C9.59527 23.9214 9.7362 24.0189 9.7362 24.1396Z"
              fill="#999999"
            />
            <path
              d="M10.8388 23.9487C10.8594 24.0672 10.7398 24.1888 10.5689 24.221C10.4009 24.2524 10.2453 24.1793 10.224 24.0618C10.2032 23.9404 10.3249 23.8188 10.4927 23.7873C10.6638 23.7571 10.8169 23.8283 10.8388 23.9487Z"
              fill="#999999"
            />
          </svg>
        </div>
      ) : (
        <div>
          <EditProfileInput
            label="URL"
            placeholder="Enter your social media url"
            value={socialMediaUrl}
            setValue={setSocialMediaUrl}
          />

          <div className={styles.Button}>
            <Button text="Add" onClick={AddSocialMedia} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSocialMedia;
