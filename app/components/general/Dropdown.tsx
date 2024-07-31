"use client";
import './Dropdown.css';
import React from 'react';

interface DropdownProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    list: Array<{ value: string, label: string }>;
    count?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ id, value, onChange, list, count }) => {
    return (
        <div style={{ position: 'relative' }}>
            {count && <span className="form-counter-span">{list.length}</span>}
            <select className="form-dropdown" id={id} value={value} onChange={onChange}>
                {list.map((item, index) => (
                    <option className="drop-down-option" key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
