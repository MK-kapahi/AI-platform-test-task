"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface StreamingTextProps {
  text: string
  className?: string
  speed?: number
  onComplete?: () => void
}

export function StreamingText({ 
  text, 
  className, 
  speed = 30,
  onComplete 
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (currentIndex === text.length && onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}
