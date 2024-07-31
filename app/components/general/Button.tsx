import './Button.css'
import React from 'react';

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
}) => {
  const buttonStyle = {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor,
    color: textColor,
    border: `${borderLine}px solid ${borderColor}`,
    fontSize,
    fontWeight,
  };

  return (
    <button className={`form-button`} style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
