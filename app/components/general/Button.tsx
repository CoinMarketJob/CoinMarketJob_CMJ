import React, { useState } from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderLine?: number;
  borderColor?: string;
  fontSize?: number;
  fontWeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  clickedBackgroundColor?: string;
  clickedTextColor?: string;
  clickedBorderColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  hoverUnderlineText?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  backgroundColor = "#242220",
  textColor = "#FFFFFF",
  borderLine = 0,
  borderColor = "#242220",
  fontSize,
  fontWeight,
  paddingTop = 10,
  paddingBottom = 10,
  paddingLeft = 21,
  paddingRight = 21,
  clickedBackgroundColor,
  clickedTextColor,
  clickedBorderColor,
  hoverBackgroundColor,
  hoverTextColor,
  hoverBorderColor,
  hoverUnderlineText = false,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor: isClicked && clickedBackgroundColor 
      ? clickedBackgroundColor 
      : isHovered && hoverBackgroundColor 
        ? hoverBackgroundColor 
        : backgroundColor,
    color: isClicked && clickedTextColor 
      ? clickedTextColor 
      : isHovered && hoverTextColor 
        ? hoverTextColor 
        : textColor,
    border: `${borderLine}px solid ${isClicked && clickedBorderColor 
      ? clickedBorderColor 
      : isHovered && hoverBorderColor 
        ? hoverBorderColor 
        : borderColor}`,
    fontSize,
    fontWeight,
    textDecoration: isHovered && hoverUnderlineText ? 'underline' : 'none', // Hover durumunda alt çizgi
  };

  return (
    <button 
      className={`form-button`} 
      style={buttonStyle} 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </button>
  );
};

export default Button;
