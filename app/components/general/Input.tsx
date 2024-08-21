"use client"
import './Input.css'
import React, { useRef, useEffect } from 'react'

interface InputProps {
    id: string
    placeholder: string
    type: string
    required?: boolean
    disabled?: boolean
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    paddingRight?: number
    paddingLeft?: number
}

const Input: React.FC<InputProps> = ({ id, placeholder, type, required, disabled, value, onChange, paddingRight, paddingLeft }) => {
    const spanRef = useRef<HTMLSpanElement>(null);

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
        if (spanRef.current && value) {
            spanRef.current.classList.add('form-span-focused');
        }
    }, [value]);

    return (
        <div style={{ position: 'relative', overflow: "visible", height: "100%" }}>
            <input
                className="form-input"
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
