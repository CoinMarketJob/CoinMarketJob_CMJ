import './Icon.css'
import React from 'react'

interface IconProps {
    onClick? : (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: React.ReactNode;
    size : number;
    margin? : boolean
  }

const Icon:React.FC<IconProps> = ({ onClick, children, size, margin }) => {
  return (
    <div className="icon-div" onClick={onClick} style={{marginLeft: margin ? '1rem' : '0rem', position: "relative" }}>
      <div className="icon-hover" style={{width: size, height: size}}>
        {children}
      </div>
    </div>
  )
}

export default Icon