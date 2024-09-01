"use client";
import styles from "./Checkbox.module.css";
import React from 'react';

interface SelectionType {
    name: string;
    id: string;
    value: boolean;
    onChange: (selectedValue: boolean) => void;
    label: string;
    sublabel?: string;
    borderRadius?: number;
}

const Checkbox: React.FC<SelectionType> = ({
    name,
    id,
    value,
    onChange,
    label,
    sublabel,
    borderRadius
}) => {

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        onChange(checked);
        
    };

    return (
        <div className={styles.checkboxItem}>
            <input
                style={{ borderRadius: borderRadius ?? 0 }}
                type="checkbox"
                id={id}
                checked={value}
                onChange={handleCheckboxChange}
            />
            <label
                htmlFor={id}
                className={styles.squareCheckbox}
            >
                {label}
                {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
            </label>
        </div>
    );
}

export default Checkbox;
