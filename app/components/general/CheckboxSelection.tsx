"use client";
import './CheckboxSelection.css';
import React from 'react';

interface SelectionType {
    name: string;
    id: string;
    value: string[];
    onChange: (selectedValues: string[]) => void;
    list: Array<{ id: string, label: string }>;
    multiple: boolean;
    borderRadius? : number
}

const Selection: React.FC<SelectionType> = ({ name, id, value, onChange, list, multiple, borderRadius }) => {

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: selectedValue } = e.target;

        if (!multiple) {
            if (value.includes(selectedValue)) {
                onChange([]);
            } else {
                onChange([selectedValue]);
            }
        } else {
            if (value.includes(selectedValue)) {
                onChange(value.filter(v => v !== selectedValue));
            } else {
                onChange([...value, selectedValue]);
            }
        }
    };

    return (
        <div>
        <h1 className="name">{name}</h1>
        <div className="selection-container">
            {list.map((item) => (
                <div key={item.id} className="checkbox-item">
                    <input
                    style={{borderRadius}}
                        type="checkbox"
                        id={`${id}-${item.id}`}
                        value={item.id}
                        checked={value.includes(item.id)}
                        onChange={handleCheckboxChange}
                    />
                    <label
                        htmlFor={`${id}-${item.id}`}
                        className={multiple ? 'square-checkbox' : 'circle-checkbox'}
                    >
                        {item.label}
                        {item.sublabel && <span className="sublabel">{item.sublabel}</span>}
                    </label>
                </div>
            ))}

        </div>
        </div>
    );
}

export default Selection;
