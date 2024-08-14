"use client";
import './Dropdown.css';
import React from 'react';

interface DropdownProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    list: Array<{ value: string, label: string }>;
    count?: boolean;
    className?: string;
    label?: string;
    disabled?: boolean; // Add this line
}


const Dropdown: React.FC<DropdownProps> = ({ id, value, onChange, list, count, className, label, disabled }) => {
    return (
        <div style={{ position: 'relative' }} className={className}>
            {label && <label htmlFor={id}>{label}</label>}
            {count && <span className="form-counter-span">{list.length}</span>}
            <select 
                className={`form-dropdown ${className}`} 
                id={id} 
                value={value} 
                onChange={onChange}
                disabled={disabled} // Pass the disabled prop here
            >
                {list.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}



export default Dropdown;
