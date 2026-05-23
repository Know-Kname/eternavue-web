'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&*+?'

interface GlitchTextProps {
  text: string
  className?: string
  triggerOnView?: boolean
  durationMs?: number
}

export function GlitchText({
  text,
  className,
  triggerOnView = true,
  durationMs = 1200,
}: GlitchTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(!triggerOnView)
  const [displayText, setDisplayText] = useState(text)
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    if (!triggerOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    if (containerRef.current) observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [triggerOnView])

  useEffect(() => {
    if (!isVisible) return

    const sourceChars = text.split('')
    const startTime = performance.now()
    setResolved(false)

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1)
      const settledChars = Math.floor(progress * sourceChars.length)

      const next = sourceChars.map((char, index) => {
        if (char === ' ') return ' '
        if (index < settledChars) return char
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      })

      setDisplayText(next.join(''))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      setDisplayText(text)
      setResolved(true)
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [durationMs, isVisible, text])

  return (
    <span
      ref={containerRef}
      className={cn(
        'inline-block',
        resolved ? 'animate-glitch-decode font-heading' : 'font-mono tracking-wider',
        className
      )}
      aria-label={text}
    >
      {displayText}
    </span>
  )
}

