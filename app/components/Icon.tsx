import './Icon.css'
import React from 'react'

interface IconProps {
    onClick? : (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: React.ReactNode;
    size : number;
    margin? : boolean
    marginLeft? : boolean
  }

const Icon:React.FC<IconProps> = ({ onClick, children, size, margin, marginLeft }) => {
  return (
    <div className="icon-div" onClick={onClick} style={{marginLeft: margin ? '1rem' : marginLeft ? "2.7px" : '0rem', position: "relative" }}>
      <div className="icon-hover" style={{width: size, height: size}}>
        {children}
      </div>
    </div>
  )
}

export default Icon