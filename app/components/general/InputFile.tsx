"use client";
import styles from './InputFile.module.css'
import React, { useState } from 'react'

interface InputFileProps {
    id: string
    placeholder: string
    required?: boolean
    disabled?: boolean
    value?: string  // Burada value özelliğini ekliyoruz
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputFile: React.FC<InputFileProps> = ({ id, placeholder, required, disabled, value, onChange }) => {
    const [fileName, setFileName] = useState<string>(value || '');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            onChange(e);
        }
    }

    return (
        <div className={styles.container}>
            <input 
                type="file" 
                id={id} 
                className={styles.FileInput} 
                onChange={handleFileChange}
                required={required}
                disabled={disabled}
            />
            <label htmlFor={id} className={styles.FileLabel}>
                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_969_3108)">
                        <path d="M9.35759 0.355748C8.88326 -0.118583 8.11295 -0.118583 7.63862 0.355748L2.78147 5.2129C2.30714 5.68723 2.30714 6.45754 2.78147 6.93187C3.2558 7.4062 4.02612 7.4062 4.50045 6.93187L7.28571 4.1466V12.1419C7.28571 12.8136 7.82835 13.3562 8.5 13.3562C9.17165 13.3562 9.71429 12.8136 9.71429 12.1419V4.1466L12.4996 6.93187C12.9739 7.4062 13.7442 7.4062 14.2185 6.93187C14.6929 6.45754 14.6929 5.68723 14.2185 5.2129L9.36138 0.355748H9.35759ZM2.42857 13.3562C2.42857 12.6846 1.88594 12.1419 1.21429 12.1419C0.542634 12.1419 0 12.6846 0 13.3562V15.7848C0 17.7959 1.6317 19.4276 3.64286 19.4276H13.3571C15.3683 19.4276 17 17.7959 17 15.7848V13.3562C17 12.6846 16.4574 12.1419 15.7857 12.1419C15.1141 12.1419 14.5714 12.6846 14.5714 13.3562V15.7848C14.5714 16.4564 14.0288 16.9991 13.3571 16.9991H3.64286C2.97121 16.9991 2.42857 16.4564 2.42857 15.7848V13.3562Z" fill="#242220" fillOpacity="0.4"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_969_3108">
                            <rect width="17" height="19.4286" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <span className={styles.text}>{fileName || placeholder}</span>
            </label>
        </div>
    )
}

export default InputFile;
