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
}

const Dropdown: React.FC<DropdownProps> = ({ id, value, onChange, list, count, className }) => {
    return (
        <div style={{ position: 'relative' }} className={className}>
            {count && <span className="form-counter-span">{list.length}</span>}
            <select className={`form-dropdown ${className}`} id={id} value={value} onChange={onChange}>
                {list.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
