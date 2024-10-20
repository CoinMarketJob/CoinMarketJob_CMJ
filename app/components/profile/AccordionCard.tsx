"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Send } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"

interface AccordionCardProps {
  name: string
  publicationTitle: string
  publisherName: string
  description: string
}

export default function AccordionCard({
  name = "Name Surname",
  publicationTitle = "Publication title in Publisher Name",
  publisherName = "Publisher name",
  description = "Description here. This is where the expanded content will appear when the card is clicked."
}: AccordionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded])

  const handleSendMessage = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card from toggling when clicking the send icon
    // Add your message sending logic here
    console.log("Send message clicked")
  }

  return (
    <div className="tailwind">

        <Card 
        className="w-full max-w-md cursor-pointer relative"
        onClick={() => setIsExpanded(!isExpanded)}
        >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
        </CardHeader>
        <CardContent className="pb-2">
            <p className="text-sm text-gray-600">{publicationTitle}</p>
            <p className="text-sm text-gray-500">{publisherName}</p>
        </CardContent>
        <div 
            ref={contentRef}
            style={{ height: `${contentHeight}px` }}
            className="overflow-hidden transition-all duration-300 ease-in-out"
        >
            <CardContent className="pt-0">
            <p className="text-sm text-gray-700">{description}</p>
            </CardContent>
        </div>
        <CardFooter className="pt-2 flex justify-between items-center">
            <p className="text-xs text-gray-400">Publications</p>
            <button
            onClick={handleSendMessage}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Send message"
            >
            <Send className="h-5 w-5 text-gray-500" />
            </button>
        </CardFooter>
        </Card>
    </div>
  )
}