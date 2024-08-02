import React, { useEffect, useRef, useState } from 'react'
import styles from './PostaJobPopup.module.css';
import Button from '../general/Button';

interface Popup {
    children: React.ReactNode;
    Save: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostaJobPopup:React.FC<Popup> = ({ children, Save, open, setOpen }) => {  
   const popupRef = useRef<HTMLDivElement>(null);

   useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

    const Cancel = () => {
        setOpen(false);  
    }

  return (
    <div ref={popupRef} style={{display: open ? "block" : "none"}} className={styles.Popup}>
      {children}
      <div className={styles.ButtonGroup}>
            <Button text='Cancel' onClick={Cancel}
             backgroundColor='#FFFFFF' textColor='#000000'
             fontSize={14} fontWeight={400}  />

             <Button text='Save' onClick={Save}
              fontSize={14} fontWeight={400}
              paddingTop={12} paddingBottom={12}
              paddingLeft={27} paddingRight={28}  />
        </div>
        
    </div>
  )
}

export default PostaJobPopup