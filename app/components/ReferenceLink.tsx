"use client"
import { useState } from 'react';
import './ReferralLink.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface props {
  link: string;
}

const ReferralLink:React.FC<props> = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    alert('Link Copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="referral-container">
      <a href={link} className="referral-link">
        {link}
      </a>
      <FontAwesomeIcon onClick={copyToClipboard} style={{width: 16, height: 16, overflow: 'visible', marginLeft: '1rem'}} icon={faLink}/>
    </div>
  );
};

export default ReferralLink;