"use client";
import "./Dropdown.css";
import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  id: string;
  value: string;
  setValue: (value: string) => void; // Bu satırı değiştirdik
  list: Array<{ value: string; label: string }>;
  placeholder?: string;
  error?: boolean;

}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  value,
  setValue,
  list,
  placeholder,
  error,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setOpen(!open);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
      <div 
        className={`dropdown-input ${error ? 'error' : ''}`}
        onClick={() => setOpen(!open)} 
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          borderColor: open ? "#242220" : error ? "red" : "#E7E5E4"
        }}
      >
        <div className="dropdown-label">
          {value ? list.find(item => item.value === value)?.label : placeholder}
        </div>
        <div className="dropdown-arrow">
          <svg
            width="23"
            height="12"
            viewBox="0 0 23 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`arrow-icon ${open ? "open" : ""}`}
          >
            <path
              d="M11.1524 12C10.9172 12 10.7001 11.9616 10.5013 11.8847C10.3025 11.8075 10.1076 11.6737 9.91683 11.4833L0.32896 1.89485C0.124308 1.69056 0.0150631 1.43985 0.00122538 1.1427C-0.0129765 0.845918 0.0962684 0.581362 0.32896 0.349035C0.561287 0.116343 0.818923 0 1.10187 0C1.38481 0 1.64245 0.116343 1.87477 0.349035L11.1524 9.62611L20.43 0.349035C20.6343 0.144383 20.885 0.0351379 21.1822 0.0213002C21.4789 0.00709838 21.7435 0.116343 21.9758 0.349035C22.2085 0.581362 22.3249 0.838999 22.3249 1.12194C22.3249 1.40489 22.2085 1.66252 21.9758 1.89485L12.388 11.4833C12.1971 11.6737 12.0023 11.8075 11.8035 11.8847C11.6047 11.9616 11.3876 12 11.1524 12Z"
              fill="#999999"
            />
          </svg>
        </div>
      </div>

      <div className="list-container" style={{ display: !open ? "none" : "" }}>
        {list.map((item, index) => (
          <div
            key={index}
            className={`list-item ${
              value === item.value ? "item-selected" : ""
            }`}
            onClick={() => {
              setValue(item.value);
              setOpen(false);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;