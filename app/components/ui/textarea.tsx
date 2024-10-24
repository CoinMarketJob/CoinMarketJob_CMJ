"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onContentChange?: () => void
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onContentChange, error, ...props }, ref) => {
    const [isItalic, setIsItalic] = React.useState(false)
    const [isListActive, setIsListActive] = React.useState(false)

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    const handleFormatChange = (format: 'italic') => {
      setIsItalic((prev) => !prev)
      if (onContentChange) onContentChange()
    }

    const handleListCreation = () => {
      setIsListActive((prev) => !prev)
      const textarea = textareaRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        const before = text.substring(0, start)
        const after = text.substring(end)
        const bulletPoint = '• '

        let newText: string
        if (start === end) {
          // If no text is selected, add a bullet point at the cursor position
          newText = before + bulletPoint + after
          textarea.value = newText
          textarea.selectionStart = textarea.selectionEnd = start + bulletPoint.length
        } else {
          // If text is selected, add bullet points to the beginning of each line
          const selectedText = text.substring(start, end)
          newText = before + selectedText.split('\n').map(line => bulletPoint + line).join('\n') + after
          textarea.value = newText
          textarea.selectionStart = start
          textarea.selectionEnd = start + (newText.length - after.length - before.length)
        }

        setIsListActive(true)
        if (onContentChange) onContentChange()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && isListActive) {
        e.preventDefault()
        const textarea = e.currentTarget
        const cursorPosition = textarea.selectionStart
        const textBeforeCursor = textarea.value.substring(0, cursorPosition)
        const textAfterCursor = textarea.value.substring(cursorPosition)
        
        if (textBeforeCursor.endsWith('• ') && textBeforeCursor.trim() === '•') {
          // If the current line is empty (just a bullet point), end the list
          const newText = textBeforeCursor.slice(0, -2) + textAfterCursor
          textarea.value = newText
          textarea.selectionStart = textarea.selectionEnd = cursorPosition - 2
          setIsListActive(false)
        } else {
          // Add a new bullet point
          const newText = textBeforeCursor + '\n• ' + textAfterCursor
          textarea.value = newText
          textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3
        }
        
        if (onContentChange) onContentChange()
      }
    }

    return (
      <div className={cn("rounded-[15px] w-full border border-[#E7E5E4]", error && "border-2 border-red-500")}>
        <div className="flex items-center border-b border-[#E7E5E4] px-6 h-[50px] space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleListCreation}
            className={cn(
              "hover:bg-[rgba(36,34,32,0.05)] rounded-full w-8 h-8 p-0",
              isListActive ? "text-black" : "text-[#999999]"
            )}
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.875 5.25H19.25M7.875 10.5H19.25M7.875 15.75H19.25M2.625 5.25H3.5C3.91421 5.25 4.25 5.58579 4.25 6V6C4.25 6.41421 3.91421 6.75 3.5 6.75H2.625C2.21079 6.75 1.875 6.41421 1.875 6V6C1.875 5.58579 2.21079 5.25 2.625 5.25ZM2.625 10.5H3.5C3.91421 10.5 4.25 10.8358 4.25 11.25V11.25C4.25 11.6642 3.91421 12 3.5 12H2.625C2.21079 12 1.875 11.6642 1.875 11.25V11.25C1.875 10.8358 2.21079 10.5 2.625 10.5ZM2.625 15.75H3.5C3.91421 15.75 4.25 16.0858 4.25 16.5V16.5C4.25 16.9142 3.91421 17.25 3.5 17.25H2.625C2.21079 17.25 1.875 16.9142 1.875 16.5V16.5C1.875 16.0858 2.21079 15.75 2.625 15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormatChange('italic')}
            className={cn(
              "italic text-xl font-serif hover:bg-[rgba(36,34,32,0.05)] hover:text-[rgba(36,34,32,0.8)] rounded-full w-8 h-8 p-0",
              isItalic ? "text-[rgba(36,34,32,0.8)]" : "text-[#999999]"
            )}
          >
            I
          </Button>
        </div>
        <div className="p-6">
          <textarea
            className={cn(
              "w-full min-h-[80px] resize-none focus:outline-none",
              isItalic && "italic",
              className
            )}
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            {...props}
          />
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }