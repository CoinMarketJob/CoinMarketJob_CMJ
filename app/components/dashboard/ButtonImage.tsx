import React, { useState } from "react";
import "./ButtonImage.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonImage: React.FC<ButtonProps> = ({ children, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: "#FFFFFF",
    border: `1px solid #E7E5E4`,
    cursor: "pointer", // Change cursor if disabled
    transition: "all 0.1s ease-in-out",
  };

  return (
    <button className="form-button" style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonImage;
