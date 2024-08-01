import './Icon.css';
import React from 'react';

interface IconProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  marginBottom?: number;
  hoverSize?: number;
  hoverContent?: string;
  width?: number; // Add width prop
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
  width, // Destructure width
  children
}) => {
  return (
    <div
      className="icon-div"
      onClick={onClick}
      style={{
        marginRight,
        marginBottom,
        marginTop,
        marginLeft,
        position: 'relative',
        width: width, // Apply width style
        height: width, // Apply height style based on width for square icons
      }}
    >
      <div
        className="icon-hover"
        style={{
          width: hoverSize,
          height: hoverSize,
        }}
      >
        <div className="hover-content">{hoverContent}</div>
        {children}
      </div>
    </div>
  );
};

export default Icon;
