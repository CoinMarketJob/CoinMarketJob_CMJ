"use client"
import { useState } from 'react';
import './ReferralLink.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';

interface props {
  link: string;
}

const ReferralLink:React.FC<props> = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
      <Icon onClick={copyToClipboard} />
    </div>
  );
};

export default ReferralLink;