import React, { useState } from "react";
import styles from "./CollapsedSocialMedia.module.css";
import SocialMediaItem from "./SocialMediaItem";

interface CustomSocialMedia {
  socialMediaType: string;
  socialMediaUrl: string;
  platformName: string;
  username: string;
}

interface CollapsedSocialMediaProps {
  socialMedias: CustomSocialMedia[];
}

const CollapsedSocialMedia: React.FC<CollapsedSocialMediaProps> = ({
  socialMedias,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={styles.collapsedItem}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.8991 9.70692L22.8882 13.696C24.1598 14.9677 24.7958 16.4997 24.7959 18.2919C24.7961 20.0842 24.1606 21.616 22.8893 22.8873C21.618 24.1586 20.0859 24.7945 18.2928 24.795C16.4998 24.7956 14.9674 24.1601 13.6958 22.8884L9.70668 18.8993L10.834 17.772L14.8231 21.7611C15.7771 22.715 16.9334 23.192 18.2923 23.192C19.6507 23.192 20.8069 22.715 21.7608 21.7611C22.7148 20.8072 23.1917 19.651 23.1917 18.2925C23.1917 16.9337 22.7148 15.7773 21.7608 14.8234L17.7717 10.8343L18.8991 9.70692ZM17.2515 16.1243L16.1241 17.2517L8.23267 9.36026L9.36002 8.23291L17.2515 16.1243ZM15.7774 6.5853L14.6501 7.71264L10.661 3.72353C9.70706 2.7696 8.55068 2.29264 7.19185 2.29264C5.8334 2.29264 4.67721 2.7696 3.72329 3.72352C2.76936 4.67745 2.2924 5.83364 2.2924 7.19209C2.2924 8.55092 2.76936 9.7073 3.72329 10.6612L7.7124 14.6503L6.58506 15.7777L2.59594 11.7886C1.32429 10.5169 0.688374 8.98495 0.688187 7.19265C0.687998 5.40036 1.32354 3.86858 2.59481 2.59731C3.86608 1.32603 5.39824 0.690115 7.19129 0.689553C8.98433 0.688989 10.5167 1.32453 11.7883 2.59618L15.7774 6.5853Z"
            fill="#999999"
          />
        </svg>
        {socialMedias.length}
      </div>
      {isExpanded && (
        <div className={styles.expandedList}>
          {socialMedias.map((item, index) => (
            <SocialMediaItem
              key={index}
              type={item.socialMediaType}
              url={item.socialMediaUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsedSocialMedia;
