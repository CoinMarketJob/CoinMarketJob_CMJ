"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import './Input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, value, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const spanRef = React.useRef<HTMLSpanElement>(null)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (spanRef.current) {
      setIsFocused(true)
      props.onFocus?.(e)
      }
  
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (value === "") {
      setIsFocused(false)
      props.onBlur?.(e)
      }
     
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== '')
      props.onChange?.(e)
    }

    React.useEffect(() => {
      if (spanRef.current) {
        if (isFocused || hasValue) {
          spanRef.current.classList.add('form-span-focused')
        } else {
          spanRef.current.classList.remove('form-span-focused')
        }
      }
    }, [isFocused, hasValue])

    return (
      <div className="input-container">
        <input
          type={type}
          className={cn(
            "form-input",
            { 'error-input': error },
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <span ref={spanRef} className="form-span">{placeholder}</span>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }