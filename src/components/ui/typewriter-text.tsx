"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
  className?: string
}

export function TypewriterText({
  texts,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseTime = 2000,
  className = "",
}: TypewriterTextProps) {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  useEffect(() => {
    const i = loopNum % texts.length
    const fullText = texts[i]

    let speed = typingSpeed

    if (isDeleting) {
      speed = deletingSpeed
    } else if (text === fullText) {
      speed = pauseTime
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === fullText) {
        setIsDeleting(true)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum((prev) => prev + 1)
      } else {
        setText(
          fullText.substring(0, isDeleting ? text.length - 1 : text.length + 1)
        )
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [
    text,
    isDeleting,
    loopNum,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ])

  return <span className={className}>{text}</span>
}
