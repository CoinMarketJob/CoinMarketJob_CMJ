import './Icon.css';
import React, { useState, useEffect, useRef } from 'react';

interface IconProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  marginBottom?: number;
  hoverSize?: number;
  hoverContent?: string;
  width?: number;
  children: React.ReactNode;
  disableHover?: boolean;
  tooltipPosition?: 'top' | 'bottom'; // Yeni prop eklendi
}

const Icon: React.FC<IconProps> = ({
  onClick,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  hoverSize,
  hoverContent,
  width,
  children,
  disableHover = false,
  tooltipPosition = 'top' // Varsayılan değer 'top'
}) => {
  const [showHover, setShowHover] = useState(false);
  // timerRef'i kaldırıyoruz çünkü artık gecikme olmayacak

  const handleMouseEnter = () => {
    if (!disableHover) {
      setShowHover(true); // Gecikme olmadan direkt göster
    }
  };

  const handleMouseLeave = () => {
    setShowHover(false);
  };

  // useEffect hook'unu kaldırıyoruz çünkü artık timer kullanmıyoruz

  return (
    <div
      className="icon-div"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        marginRight,
        marginBottom,
        marginTop,
        marginLeft,
        width: width,
        height: width,
      }}
    >
      <div
        className={`icon-hover ${disableHover ? 'no-hover' : ''}`}
        style={{
          width: hoverSize,
          height: hoverSize,
        }}
      >
        {children}
      </div>
      {!disableHover && (
        <div className={`hover-content ${showHover ? 'show' : ''} ${tooltipPosition}`}>{hoverContent}</div>
      )}
    </div>
  );
};

export default Icon;
