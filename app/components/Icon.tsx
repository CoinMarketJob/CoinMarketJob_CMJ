import './Icon.css'
import React from 'react'

interface IconProps {
    onClick? : (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children: React.ReactNode;
    size : number;
    margin? : boolean
    marginLeft? : boolean
    marginRight? : boolean
    marginTop? : boolean
  }

const Icon:React.FC<IconProps> = ({ onClick, children, size, margin, marginLeft, marginRight, marginTop }) => {
  return (
    <div className="icon-div" onClick={onClick} style={{marginLeft: margin ? '1rem' : marginLeft ? "2.7px" : '0rem', position: "relative", marginRight: marginRight ? "-0.5px" : 0, marginTop: marginTop ? "-0.3px" : 0 }}>
      <div className="icon-hover" style={{width: size, height: size}}>
        {children}
      </div>
    </div>
  )
}

export default Icon