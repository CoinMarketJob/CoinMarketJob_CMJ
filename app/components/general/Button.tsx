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
  disabled?: boolean;  // Add disabled property here
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
  disabled = false,  // Add default value for disabled
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled) { // Only handle click if not disabled
      setIsClicked((prev) => !prev);
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true); // Prevent hover state if disabled
  };

  const handleMouseLeave = () => {
    if (!disabled) setIsHovered(false);
  };

  const buttonStyle = {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor: disabled 
      ? '#d3d3d3' // Set a default disabled color
      : isClicked 
        ? clickedBackgroundColor || backgroundColor 
        : isHovered 
          ? hoverBackgroundColor || backgroundColor 
          : backgroundColor,
    color: disabled ? '#888888' : isClicked 
      ? clickedTextColor || textColor 
      : isHovered 
        ? hoverTextColor || textColor 
        : textColor,
    border: `${borderLine}px solid ${
      disabled ? '#cccccc' : isClicked 
      ? clickedBorderColor || borderColor 
      : isHovered ? hoverBorderColor || borderColor 
      : borderColor
    }`,
    fontSize,
    fontWeight,
    textDecoration: isHovered && hoverUnderlineText ? 'underline' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer', // Change cursor if disabled
  };

  return (
    <button
      className="form-button"
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled} // Pass disabled prop to button
    >
      {text}
    </button>
  );
};

export default Button;
