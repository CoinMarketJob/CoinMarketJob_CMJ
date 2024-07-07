import './Icon.css'
import React from 'react'

interface IconProps {
    onClick : (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  }

const Icon:React.FC<IconProps> = ({ onClick }) => {
  return (
    <div className="icon-div" onClick={onClick} style={{marginLeft: '1rem', position: "relative" }}>
      <div className="icon-hover" style={{width: 24, height: 24}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#24222066" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="svg-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
      </div>
    </div>
  )
}

export default Icon