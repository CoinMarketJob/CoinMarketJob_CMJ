import './Icon.css'
import React from 'react'

interface IconProps {
    onClick : (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    marginRight? : number
    marginLeft? : number
    marginTop? : number
    marginBottom? : number
    hoverSize? : number
    hoverContent? : string
    children: React.ReactNode;  
  }

const Icon:React.FC<IconProps> = ({onClick, marginRight, marginLeft, marginTop, marginBottom,hoverSize, hoverContent, children}) => {
  return (
    <div className="icon-div" onClick={onClick} style={{marginRight, marginBottom, marginTop, marginLeft, position: "relative"}}>
      <div className="icon-hover" style={{width: hoverSize, height: hoverSize}}>
        <div className="hover-content">{hoverContent}</div>
        {children}
      </div>
    </div>
  )
}

export default Icon