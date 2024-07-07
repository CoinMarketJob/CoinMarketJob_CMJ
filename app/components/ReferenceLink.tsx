"use client"
import { useState } from 'react';
import './ReferralLink.css';
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
      <Icon onClick={copyToClipboard} size={24} margin>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#24222066" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="svg-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
      </Icon>
    </div>
  );
};

export default ReferralLink;