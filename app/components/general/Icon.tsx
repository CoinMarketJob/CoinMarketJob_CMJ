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
  children
}) => {
  const [showHover, setShowHover] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setShowHover(true);
    }, 750); // Changed from 3000 to 1500 milliseconds (1.5 seconds)
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowHover(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
        className="icon-hover"
        style={{
          width: hoverSize,
          height: hoverSize,
        }}
      >
        {children}
      </div>
      <div className={`hover-content ${showHover ? 'show' : ''}`}>{hoverContent}</div>
    </div>
  );
};

export default Icon;
