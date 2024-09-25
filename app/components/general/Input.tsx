"use client"
import './Input.css'
import React, { useRef, useEffect, ChangeEvent } from 'react'

interface InputProps {
    id: string
    placeholder: string
    type: string
    required?: boolean
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
    paddingRight?: number
    paddingLeft?: number
    disabled?: boolean
    error?: boolean  // Yeni eklenen error prop'u
}

const Input: React.FC<InputProps> = ({ 
    id, 
    placeholder, 
    type, 
    required, 
    value, 
    onChange, 
    className, 
    paddingRight, 
    paddingLeft,
    disabled,
    error  // Yeni eklenen error prop'u
}) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const InputFocus = () => {
        if (spanRef.current) {
            spanRef.current.classList.add('form-span-focused');
        }
    }

    const InputBlur = () => {
        if (value === "") {
            if (spanRef.current) {
                spanRef.current.classList.remove('form-span-focused');
            }
        }
    }

    useEffect(() => {
        if (spanRef.current && inputRef.current) {
            if (value) {
                spanRef.current.classList.add('form-span-focused');
            } else {
                spanRef.current.classList.remove('form-span-focused');
            }
        }
    }, [value]);

    return (
        <div style={{ position: 'relative', overflow: "visible", height: "100%", width: "100%" }}>
            <input
                ref={inputRef}
                className={`form-input ${className || ''} ${error ? 'error-input' : ''}`}
                id={id}
                type={type}
                required={required}
                disabled={disabled}
                value={value}
                onChange={onChange}
                onFocus={InputFocus}
                onBlur={InputBlur}
                style={{ paddingRight, paddingLeft }}
            />
            <span ref={spanRef} className="form-span">{placeholder}</span>
        </div>
    );
}

export default Input
