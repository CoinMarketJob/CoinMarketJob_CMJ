"use client";
import './CheckboxSelection.css';
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

const Selection: React.FC<SelectionType> = ({ name, id, value, onChange, label, sublabel, borderRadius }) => {

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        onChange(checked);
    };

    return (
        <div>
            <div className="checkbox-item">
                <input
                    style={{ borderRadius }}
                    type="checkbox"
                    id={id}
                    checked={value}
                    onChange={handleCheckboxChange}
                />
                <label
                    htmlFor={id}
                    className="square-checkbox"
                >
                    {label}
                    {sublabel && <span className="sublabel">{sublabel}</span>}
                </label>
            </div>
        </div>
    );
}

export default Selection;
